import { Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, FormErrorMessage, useToast, Center, Card, CardBody } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz e-posta adresi").required("E-posta adresi gereklidir"),
  password: Yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Şifre gereklidir"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Center minHeight="100vh" bg="gray.50">
      <Card rounded="xl" maxWidth="400px" width="90%" boxShadow="md">
        <CardBody>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/login', {
                  method: 'POST',
                  credentials: "include",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });

                if (response.status === 200) {
                  toast({
                    title: "Giriş başarılı",
                    description: "Hoş geldiniz!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  setTimeout(() => navigate('/feed'), 500);
                } else {
                  throw new Error('Giriş başarısız');
                }
              } catch (error) {
                toast({
                  title: "Giriş başarısız",
                  description: "E-posta adresinizi veya parolanızı kontrol ediniz.",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <VStack spacing={4} align="stretch">
                  <Heading as="h1" size="lg" textAlign="center" mb={2}>Giriş Yap</Heading>

                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <FormControl isInvalid={!!(errors.email && touched.email)}>
                        <FormLabel fontSize="sm">E-posta</FormLabel>
                        <Input {...field} type="email" placeholder="E-posta adresinizi girin" size="sm" />
                        <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <FormControl isInvalid={!!(errors.password && touched.password)}>
                        <FormLabel fontSize="sm">Şifre</FormLabel>
                        <Input {...field} type="password" placeholder="Şifrenizi girin" size="sm" />
                        <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button type="submit" colorScheme="blue" size="sm" isLoading={isSubmitting}>
                    Giriş Yap
                  </Button>

                  <Text textAlign="center" fontSize="sm">
                    <Link color="blue.500" href="/forgot-password">Şifremi Unuttum</Link>
                  </Text>

                  <Text textAlign="center" fontSize="sm">
                    Hesabınız yok mu?{" "}
                    <Link color="blue.500" href="/sign-up">Hesap Oluştur</Link>
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
