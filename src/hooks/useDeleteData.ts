import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";

export const useDeleteData = <TResponse>(
  deleteFunction: (id: number) => Promise<TResponse>,
  queryKey: string[],
): UseMutationResult<TResponse, unknown, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFunction,
    onSuccess: (response) => {
      console.log(response);
      toast.success((response as { message: string }).message);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
