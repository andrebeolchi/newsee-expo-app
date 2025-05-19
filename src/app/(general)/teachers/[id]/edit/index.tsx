import dayjs from 'dayjs';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { LucideUndo2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, TextInputProps, View } from 'react-native';
import { DateInput } from '~/components/birthdate-input';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useGetUser, useUpdateTeacher } from '~/modules/users';

const InputWithLabel = ({
  label,
  currentValue = '',
  onChangeText,
  ...props
}: TextInputProps & {
  label: string;
  currentValue?: string;
  onChangeText?: (_: string) => void
}) => (
  <View className='gap-1'>
    <View className='flex-row items-center justify-between'>
      <Label className='text-sm'>
        {label}
      </Label>

      <Button
        size='icon'
        variant='secondary'
        onPress={() => onChangeText?.(currentValue)}
        disabled={props?.value === currentValue}
      >
        {currentValue !== '' && props?.value !== currentValue && <LucideUndo2 size={16} />}
      </Button>
    </View>
    <Input {...props} onChangeText={onChangeText} />
  </View>
);

export default function EditTeacherScreen() {
  const router = useRouter();
  const localParams = useGlobalSearchParams() as { id: string };
  const { data, status } = useGetUser(`${localParams.id}`);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const hasChanges = name || email || username || !birthday

  const { mutateAsync, isPending } = useUpdateTeacher({
    onSuccess: () => {
      router.canGoBack() && router.back();
    },
  });

  const handleUpdate = async () => {
    try {
      await mutateAsync({
        id: localParams.id,
        birthday: dayjs(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
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
        Editar professor
      </Text>

      <View className='flex-1 gap-3'>
        {status !== 'pending' && (
          <>
            <InputWithLabel
              label='Nome'
              currentValue={data?.fullName}
              value={name || data?.fullName}
              onChangeText={setName}
              autoCapitalize='none'
            />

            <InputWithLabel
              label='Email'
              currentValue={data?.email}
              value={email || data?.email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />

            <InputWithLabel
              label='Usuário'
              currentValue={data?.username}
              value={username || data?.username}
              onChangeText={(text) => setUsername(text.toLowerCase().trim())}
              autoCapitalize='none'
            />

            <View className='gap-1'>
              <View className='flex-row items-center justify-between'>
                <Label className='text-sm'>
                  Data de nascimento
                </Label>

                <Button
                  size='icon'
                  variant='secondary'
                  onPress={() => setBirthday(dayjs(data?.birthday).format('DD/MM/YYYY'))}
                  disabled={birthday === dayjs(data?.birthday).format('DD/MM/YYYY')}
                >
                  {birthday !== '' && birthday !== dayjs(data?.birthday).format('DD/MM/YYYY') && <LucideUndo2 size={16} />}
                </Button>
              </View>
              <DateInput
                value={birthday || dayjs(data?.birthday).format('DD/MM/YYYY')}
                onChangeText={setBirthday}
              />
            </View>
          </>
        )}
      </View>

      <Button
        disabled={isPending || !hasChanges}
        onPress={() => handleUpdate()}
      >
        {isPending && (
          <ActivityIndicator size='small' color='#fff' />
        )}
        {!isPending && (
          <Text>
            Salvar alterações
          </Text>
        )}
      </Button>
    </View>
  )
}