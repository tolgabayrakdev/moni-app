import { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  HStack,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('OrnekKullanici');
  const [email, setEmail] = useState('ornek@email.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleSaveChanges = () => {
    // Burada API çağrısı yapılacak
    toast({
      title: 'Değişiklikler kaydedildi.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Şifreler eşleşmiyor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Burada şifre değiştirme API çağrısı yapılacak
    toast({
      title: 'Şifre değiştirildi.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      // Burada hesap silme API çağrısı yapılacak
      toast({
        title: 'Hesabınız silindi.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <VStack spacing={6} align="stretch" width="100%" maxWidth="600px" margin="auto">
      <Card>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="md" color={textColor}>Profil Bilgileri</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel fontSize="sm">Kullanıcı Adı</FormLabel>
              <Input 
                size="sm"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">E-posta</FormLabel>
              <Input 
                size="sm"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                isReadOnly={!isEditing}
              />
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          {isEditing ? (
            <Button size="sm" colorScheme="blue" onClick={handleSaveChanges}>Değişiklikleri Kaydet</Button>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>Düzenle</Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md" color={textColor}>Şifre Değiştir</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel fontSize="sm">Yeni Şifre</FormLabel>
              <Input 
                size="sm"
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Yeni Şifre (Tekrar)</FormLabel>
              <Input 
                size="sm"
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          <Button size="sm" colorScheme="blue" onClick={handleChangePassword}>Şifreyi Değiştir</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md" color={textColor}>Hesabı Sil</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">Bu işlem geri alınamaz. Tüm verileriniz silinecektir.</Text>
        </CardBody>
        <CardFooter>
          <Button size="sm" colorScheme="red" onClick={handleDeleteAccount}>Hesabı Sil</Button>
        </CardFooter>
      </Card>
    </VStack>
  );
}
