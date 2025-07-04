import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateRole } from '../../../hooks/useCreateRole';
import { ADMIN_ROUTES } from '@/routes/routeRoles';

export function useCreateRolePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateRole();

  const schema = z.object({
    name: z.string().min(1, t('roles.add.form.nameRequired')),
    description: z.string().min(1, t('roles.add.form.descriptionRequired')),
  });

  type FormSchema = z.infer<typeof schema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' }
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await mutateAsync(data);
      form.reset();
      navigate(ADMIN_ROUTES.roles.list);
    } catch (err: any) {
      console.error(err);
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
  };
} 