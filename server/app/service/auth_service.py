from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..model import User
from ..schema.auth_schema import LoginSchema, RegisterSchema
from ..util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError
from typing import Dict

helper = Helper()


class AuthenticationService:
    @staticmethod
    def verify_user(id: int, db: Session):
        user = db.query(User).filter_by(id=id).first()
        return user if user else None

    @staticmethod
    def login(payload: LoginSchema, db: Session) -> Dict[str, str]:
        try:
            user = db.query(User).filter_by(email=payload.email).first()
            if user is None or not helper.match_hash_text(
                str(user.password), payload.password
            ):
                raise HTTPException(status_code=400, detail="Email or password wrong!")

            access_token = helper.generate_access_token({"user_id": user.id})
            refresh_token = helper.generate_refresh_token({"user_id": user.id})

            return {"access_token": access_token, "refresh_token": refresh_token}
        except SQLAlchemyError:
            raise HTTPException(
                status_code=500, detail="An unexpected server error occurred."
            )

    @staticmethod
    def register(payload: RegisterSchema, db: Session) -> Dict[str, str]:
        try:
            existing_user_email = db.query(User).filter_by(email=payload.email).first()
            existing_user_username = db.query(User).filter_by(username=payload.username).first()
            if existing_user_username:
                raise HTTPException(status_code=400, detail="Username already taken!")

            if existing_user_email:
                raise HTTPException(status_code=400, detail="Email already taken!")

            user = User(
                username=payload.username,
                email=payload.email,
                password=helper.generate_hash_password(payload.password),
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return {"message": "Account created."}
        except SQLAlchemyError:
            db.rollback()
            raise HTTPException(
                status_code=500, detail="An unexpected server error occurred."
            )