import { useNavigate, useParams } from 'react-router-dom';
import { useGetRole } from '../../../hooks/role/useGetRole';
import { ADMIN_ROUTES } from '@/routes/routeRoles';
import { useState } from 'react';
import { mapRoleResponseToRole } from '@/modules/admin/mappers/roleMappers';
import type { Role } from '../../../types';
import { useEnableDisableRole } from '../../../hooks';

export function useViewRolePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { data: axiosData, isLoading } = useGetRole({ id: id || '' });
  
  const apiData = axiosData?.data; 
  const role: Role | undefined = mapRoleResponseToRole(apiData);

  const { enable, disable } = useEnableDisableRole();

  const handleEdit = () => {
    if (role?.id) {
      navigate(ADMIN_ROUTES.roles.edit(role.id));
    }
  };

  const handleBack = () => {
    navigate(ADMIN_ROUTES.roles.list);
  };

  const handleToggleActive = async (active: boolean) => {
    if (!role?.id) return;
    setIsDeleting(true);
    try {
      if (active) {
        await enable.mutateAsync(role.id);
      } else {
        await disable.mutateAsync(role.id);
      }
      navigate(ADMIN_ROUTES.roles.list);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isLoading,
    role,
    isDeleting,
    handleEdit,
    handleBack,
    handleToggleActive
  };
} 