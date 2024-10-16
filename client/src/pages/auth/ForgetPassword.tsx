import { Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, FormErrorMessage, Center, Card, CardBody } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Geçersiz e-posta adresi").required("E-posta adresi gereklidir"),
});

export default function ForgetPassword() {
    return (
        <Center minHeight="100vh" bg="gray.50">
            <Card rounded="xl" maxWidth="400px" width="90%" boxShadow="md">
                <CardBody>
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ResetPasswordSchema}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            // Burada şifre sıfırlama işlemini gerçekleştirebilirsiniz
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <VStack spacing={3} align="stretch">
                                    <Heading as="h1" size="lg" textAlign="center">Şifre Sıfırlama</Heading>

                                    <Text fontSize="sm" textAlign="center">
                                        Şifrenizi sıfırlamak için e-posta adresinizi girin. Size şifre sıfırlama talimatlarını içeren bir e-posta göndereceğiz.
                                    </Text>

                                    <Field name="email">
                                        {({ field }: FieldProps) => (
                                            <FormControl isInvalid={!!(errors.email && touched.email)}>
                                                <FormLabel fontSize="sm">E-posta</FormLabel>
                                                <Input {...field} type="email" placeholder="E-posta adresinizi girin" size="sm" />
                                                <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Button mt={1} type="submit" colorScheme="blue" size="sm">
                                        Şifre Sıfırlama Bağlantısı Gönder
                                    </Button>

                                    <Text textAlign="center" fontSize="sm">
                                        <Link color="blue.500" href="/sign-in" fontSize="sm">Giriş sayfasına dön</Link>
                                    </Text>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </Center>
    );
}
