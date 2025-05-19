import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { IAuthUser } from '~/models/users';
import { useCreatePost } from '~/modules/posts';

const TextareaWithLabel = ({
  title,
  value,
  onChangeValue
}: {
  title: string;
  value: string;
  onChangeValue: (value: string) => void;
}) => (
  <View className='gap-1'>
    <View className='flex-row items-center justify-between'>
      <Label className='text-sm'>
        {title}
      </Label>
    </View>
    <Textarea
      value={value}
      onChangeText={onChangeValue}
    />
  </View>
)

export default function NewPostScreen() {
  const router = useRouter();
  const [user] = useMMKVObject<IAuthUser>('user');

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutateAsync, isPending } = useCreatePost({
    onSuccess: () => {
      router.canGoBack() && router.back();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleCreatePost = async () => {
    try {
      await mutateAsync({
        title,
        content
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='flex-1 gap-6'>
      <BackButton />

      <Text className='text-3xl font-bold'>
        Criar postagem
      </Text>

      <TextareaWithLabel
        title='Título'
        value={title}
        onChangeValue={setTitle}
      />

      <TextareaWithLabel
        title='Conteúdo'
        value={content}
        onChangeValue={setContent}
      />

      <View className='gap-1'>
        <Label>
          Autor
        </Label>
        <Input value={user?.fullName} editable={false} />
        <Text className='text-xs text-muted-foreground'>
          Este campo não pode ser editado.
        </Text>
      </View>

      <Button
        disabled={!title || !content || isPending}
        onPress={() => handleCreatePost()}
      >
        {isPending && <ActivityIndicator size={16} className='text-primary' />}
        {!isPending && <Text>Publicar postagem</Text>}
      </Button>
    </View>
  );
}