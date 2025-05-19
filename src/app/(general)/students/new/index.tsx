import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, TextInputProps, View } from 'react-native';
import { DateInput } from '~/components/birthdate-input';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useCreateStudent } from '~/modules/users';

const InputWithLabel = ({ label, ...props }: TextInputProps & { label: string }) => {
  return (
    <View className='gap-1'>
      <Label className='text-sm'>
        {label}
      </Label>
      <Input {...props} />
    </View>
  );
}

export default function NewStudentScreen() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const { mutateAsync, isPending } = useCreateStudent({
    onSuccess: () => {
      router.canGoBack() && router.back();
    },
  });

  const handleCreateStudent = async () => {
    const [day, month, year] = birthday.split('/');
    try {
      await mutateAsync({
        birthday: `${year}-${month}-${day}`,
        email,
        fullName: name,
        username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='flex-1 gap-6'>
      <Text className='text-3xl font-bold'>
        Novo aluno
      </Text>

      <View className='gap-3'>
        <InputWithLabel
          label='Nome'
          value={name}
          onChangeText={setName}
          autoCapitalize='none'
        />

        <InputWithLabel
          label='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />

        <InputWithLabel
          label='Usuário'
          value={username}
          onChangeText={(text) => setUsername(text.toLowerCase().trim())}
          autoCapitalize='none'
        />

        <View className='gap-1'>
          <Label className='text-sm'>
            Data de nascimento
          </Label>
          <DateInput
            value={birthday}
            onChangeText={setBirthday}
          />
        </View>

        <InputWithLabel
          label='Senha'
          value={(username || birthday) && `${username}@${birthday?.split('/')[2] ?? ''}`}
          editable={false}
        />

        <Text className='text-sm text-muted-foreground'>
          *A senha é gerada automaticamente, recomendamos que o usuário altere após o primeiro acesso.
        </Text>
      </View>

      <Button
        disabled={!name || !email || isPending}
        onPress={() => handleCreateStudent()}
      >
        {isPending && (
          <ActivityIndicator size='small' color='#fff' />
        )}
        {!isPending && (
          <Text>
            Criar aluno
          </Text>
        )}
      </Button>
    </View>
  )
}