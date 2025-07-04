import { useTranslation } from 'react-i18next';
import { Button, ConfirmDialog } from '@/components';
import { useViewRolePage } from './hooks/useViewRolePage';
import { ErrorAlert } from '../../components';
import { Badge } from '@/components/ui/badge';
import { Edit, ArrowLeft, Trash2 } from 'lucide-react';
import { RoleViewSkeleton } from './components/RoleViewSkeleton';

export function ViewRolePage() {
  const { t } = useTranslation();
  const {
    isLoading,
    role,
    isDeleting,
    handleEdit,
    handleBack,
    handleToggleActive
  } = useViewRolePage();

  if (isLoading) {
    return <RoleViewSkeleton />;
  }

  if (!role) {
    return (
      <div className="flex justify-center items-center">
        <ErrorAlert
          title={t('roles.view.notFound')}
          description={t('roles.view.notFoundDescription')}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-md shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {t('roles.view.title')}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('roles.view.description')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleBack}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('common.back')}
              </Button>
              <Button
                onClick={handleEdit}
                icon={<Edit className="w-4 h-4" />}
              >
                {t('common.edit')}
              </Button>
              {role.active ? (
                <ConfirmDialog
                  trigger={
                    <Button
                      variant="destructive"
                      loading={isDeleting}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      {t('roles.view.disable')}
                    </Button>
                  }
                  title={t('roles.disable.title')}
                  description={t('roles.disable.description')}
                  confirmText={t('roles.view.disable')}
                  cancelText={t('common.cancel')}
                  onConfirm={() => handleToggleActive(false)}
                  variant="destructive"
                />
              ) : (
                <ConfirmDialog
                  trigger={
                    <Button
                      variant="default"
                      loading={isDeleting}
                      icon={<Edit className="w-4 h-4" />}
                    >
                      {t('roles.view.enable')}
                    </Button>
                  }
                  title={t('roles.enable.title')}
                  description={t('roles.enable.description')}
                  confirmText={t('roles.view.enable')}
                  cancelText={t('common.cancel')}
                  onConfirm={() => handleToggleActive(true)}
                  variant="default"
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('roles.view.form.code')}
              </label>
              <div className="p-3 bg-muted/50 rounded-md border">
                <span className="text-foreground">{role.code || '-'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('roles.view.form.name')}
              </label>
              <div className="p-3 bg-muted/50 rounded-md border">
                <span className="text-foreground">{role.name || '-'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('roles.view.form.status')}
              </label>
              <div className="p-3 bg-muted/50 rounded-md border">
                {role.active ? (
                  <Badge variant="default">{t('roles.list.table.column_active_true')}</Badge>
                ) : (
                  <Badge variant="secondary">{t('roles.list.table.column_active_false')}</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('roles.view.form.description')}
            </label>
            <div className="p-3 bg-muted/50 rounded-md border min-h-[80px]">
              <span className="text-foreground whitespace-pre-wrap">
                {role.description || t('roles.view.form.noDescription')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 