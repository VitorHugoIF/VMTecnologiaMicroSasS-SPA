import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUpdateRole, useGetRole } from '../../../hooks';
import { ADMIN_ROUTES } from '@/routes/routeRoles';

export function useEditRolePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateRole();
  const [apiError, setApiError] = useState<string | null>(null);
  const { data, isLoading, error } = useGetRole({ id: id || '' });

  const schema = z.object({
    name: z.string().min(1, t('roles.edit.form.nameRequired')),
    description: z.string().min(1, t('roles.edit.form.descriptionRequired')),
  });

  type FormSchema = z.infer<typeof schema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' }
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.data?.name || '',
        description: data.data.data?.description || ''
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: FormSchema) => {
    setApiError(null);
    try {
      await mutateAsync({ id: id!, ...formData });
      navigate(ADMIN_ROUTES.roles.list);
    } catch (err: any) {
      const apiResponse = err?.response?.data;
      setApiError(apiResponse?.message || err?.message || 'Erro ao editar role');
    }
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTES.roles.list);
  };

  return {
    form,
    onSubmit,
    handleCancel,
    isPending,
    apiError,
    isLoading,
    error
  };
} 