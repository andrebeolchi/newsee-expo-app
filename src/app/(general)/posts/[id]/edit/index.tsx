import { useGlobalSearchParams, useRouter } from 'expo-router';
import { LucideUndo2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { useGetPost, useUpdatePost } from '~/modules/posts';

const TextareaWithLabel = ({
  title,
  value,
  currentValue,
  onChangeValue
}: {
  title: string;
  value: string;
  currentValue: string;
  onChangeValue: (value: string) => void;
}) => (
  <View className='gap-1'>
    <View className='flex-row items-center justify-between'>
      <Label className='text-sm'>
        {title}
      </Label>

      <Button
        size='icon'
        variant='secondary'
        onPress={() => onChangeValue(currentValue || '')}
        disabled={value === currentValue}
      >
        {value !== currentValue && <LucideUndo2 size={16} />}
      </Button>
    </View>
    <Textarea
      value={value}
      onChangeText={onChangeValue}
    />
  </View>
)

export default function PostScreen() {
  const router = useRouter();
  const localParams = useGlobalSearchParams() as { id: string };
  const { data } = useGetPost(`${localParams.id}`);

  const [title, setTitle] = useState<string>(data?.title || '');
  const [content, setContent] = useState<string>(data?.content || '');

  const hasChanges = title !== data?.title || content !== data?.content;

  const { mutateAsync, isPending } = useUpdatePost({
    onSuccess: () => {
      router.canGoBack() && router.back();
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleUpdatePost = async () => {
    try {
      await mutateAsync({
        id: localParams.id,
        title,
        content
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='flex-1 gap-6'>
      <Text className='text-3xl font-bold'>
        Editar postagem
      </Text>

      <TextareaWithLabel
        title='Título'
        value={title}
        currentValue={data?.title || ''}
        onChangeValue={setTitle}
      />

      <TextareaWithLabel
        title='Conteúdo'
        value={content}
        currentValue={data?.content || ''}
        onChangeValue={setContent}
      />

      <View className='gap-1'>
        <Label className='text-sm'>
          Autor
        </Label>
        <Input value={data?.author?.fullName} editable={false} />
      </View>

      <Button
        disabled={!hasChanges || isPending}
        onPress={() => handleUpdatePost()}
      >
        {isPending && (
          <ActivityIndicator size={16} className='text-primary' />
        )}
        
        {!isPending && <Text>Salvar alterações</Text>}
      </Button>
    </View>
  );
}