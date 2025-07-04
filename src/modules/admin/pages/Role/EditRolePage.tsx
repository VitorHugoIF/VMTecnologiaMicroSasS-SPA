import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Card';
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
    isLoading,
    isDataLoading,
  } = useEditRolePage();

  const { register, handleSubmit, formState: { errors } } = form;

  if (isDataLoading) {
    return <EditRoleSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('roles.edit.title')} description={t('roles.edit.description')}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                disabled={isLoading}
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
                disabled={isLoading}
                {...register('description')}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              loading={isLoading}
            >
              {t('common.save')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 