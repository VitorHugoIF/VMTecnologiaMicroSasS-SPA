import { useTranslation } from 'react-i18next';
import { Input, Label, Button } from '@/components';
import { ErrorAlert } from '../../../components';
import { useEditRolePage } from './hooks/useEditRolePage';
import { EditRoleSkeleton } from './components/EditRoleSkeleton';

export function EditRolePage() {
  const { t } = useTranslation();
  const {
    form,
    onSubmit,
    handleCancel,
    isPending,
    isLoading,
  } = useEditRolePage();

  const { register, handleSubmit, formState: { errors } } = form;

  if (isLoading) {
    return <EditRoleSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-md shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold text-foreground">
            {t('roles.edit.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('roles.edit.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {errors.name && (
            <ErrorAlert
              title={t('common.error')}
              description={errors.name?.message}
            />
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('roles.edit.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('roles.edit.form.namePlaceholder')}
                disabled={isPending}
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {t('roles.edit.form.description')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="description"
                type="text"
                placeholder={t('roles.edit.form.descriptionPlaceholder')}
                disabled={isPending}
                {...register('description')}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              loading={isPending}
            >
              {t('common.save')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 