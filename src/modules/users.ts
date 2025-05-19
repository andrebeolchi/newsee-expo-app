import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/components/query-provider";
import { createStudent, createTeacher, deleteUser, getUser, getUsers, updateUser } from "~/interfaces/sdk/users";
import { IUser } from "~/models/users";

// -- User

export const useGetUser = (id: string) => useQuery({
  queryKey: ['users', id],
  queryFn: () => getUser({ id }),
})

export const useDeleteUser = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IUser) => void;
  onError?: (error: unknown) => void;
} = {}) => useMutation({
  mutationFn: (id: string) => deleteUser({ id }),
  onSuccess: (data) => {
    queryClient.setQueryData(['users', data.id], data);

    if (data.role === 'student') {
      queryClient.setQueryData(['students'], (oldData?: IUser[]) => {
        if (!oldData) return [data];
        return oldData.filter((user) => user.id !== data.id);
      })
    }

    if (data.role === 'teacher') {
      queryClient.setQueryData(['teachers'], (oldData?: IUser[]) => {
        if (!oldData) return [data];
        return oldData.filter((user) => user.id !== data.id);
      })
    }

    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.invalidateQueries({ queryKey: ['students'] });
    queryClient.invalidateQueries({ queryKey: ['teachers'] });

    onSuccess?.(data);
  },
  onError
})

// -- Student

export const useGetStudents = () => useQuery({
  queryKey: ['students'],
  queryFn: () => getUsers({ role: 'student' }),
})

export const useCreateStudent = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IUser) => void;
  onError?: (error: unknown) => void;
}) => useMutation({
  mutationFn: createStudent,
  onSuccess: (data) => {
    queryClient.setQueryData(['users', data.id], data);
    queryClient.setQueryData(['students'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['students'] });

    onSuccess?.(data);
  },
  onError
})

export const useUpdateStudent = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IUser) => void;
  onError?: (error: unknown) => void;
}) => useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    queryClient.setQueryData(['users', data.id], data);
    queryClient.setQueryData(['students'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['students'] });

    onSuccess?.(data);
  },
  onError
})

// -- Teacher

export const useGetTeachers = () => useQuery({
  queryKey: ['teachers'],
  queryFn: () => getUsers({ role: 'teacher' }),
})

export const useCreateTeacher = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IUser) => void;
  onError?: (error: unknown) => void;
}) => useMutation({
  mutationFn: createTeacher,
  onSuccess: (data) => {
    queryClient.setQueryData(['users', data.id], data);
    queryClient.setQueryData(['teachers'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['teachers'] });

    onSuccess?.(data);
  },
  onError
})

export const useUpdateTeacher = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IUser) => void;
  onError?: (error: unknown) => void;
}) => useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    queryClient.setQueryData(['users', data.id], data);
    queryClient.setQueryData(['teachers'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['teachers'] });

    onSuccess?.(data);
  },
  onError
})