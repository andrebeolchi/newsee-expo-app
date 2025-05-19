import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/components/query-provider";
import { createStudent, createTeacher, getUsers } from "~/interfaces/sdk/users";
import { IUser } from "~/models/users";

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
    queryClient.setQueryData(['students', data.id], data);
    queryClient.setQueryData(['students'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['students'] });

    onSuccess?.(data);
  },
  onError
})


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
    queryClient.setQueryData(['teachers', data.id], data);
    queryClient.setQueryData(['teachers'], (oldData?: IUser[]) => {
      if (!oldData) return [data];
      return [...oldData, data];
    })

    queryClient.invalidateQueries({ queryKey: ['teachers'] });

    onSuccess?.(data);
  },
  onError
})
