import { FC, PropsWithChildren } from 'react';

import {
  EditProfileData,
  EditProfileDataSchema,
} from 'features/editProfile/model/schema';
import { Button } from 'shared/ui/button';
import { Form } from 'shared/ui/form';
import { Modal } from 'shared/ui/modal';
import { Profile } from 'entities/profile';
import { TextField } from 'shared/ui/textField';
import { useForm } from 'shared/hooks/useForm';
import { useTranslations } from 'shared/hooks/useTranslations';
import { zodResolver } from 'shared/lib/validator';

interface EditProfileModalProps extends PropsWithChildren {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onChange: (newData: EditProfileData) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onChange,
}) => {
  const t = useTranslations();
  const schema = EditProfileDataSchema(t);
  const { register, formState, handleSubmit } = useForm<EditProfileData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile.name,
      slug: profile.slug,
      description: profile.description,
    },
  });

  const submit = handleSubmit(async (data) => {
    onChange(data);
    onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="centered-absolute bg-primary p-[30px] size-full tablet:w-[600px] tablet:h-auto tablet:rounded-md tablet:border-1 tablet:border-primary">
        <h2 className="title-md mb-[25px] whitespace-pre-line tablet:whitespace-nowrap">
          {t('edit_profile.title')}
        </h2>
        <Form onSubmit={submit}>
          <div className="flex flex-col gap-[15px]">
            <TextField
              {...register('name')}
              error={!!formState.errors.name}
              label={t('edit_profile.name')}
              helperText={formState.errors.name?.message}
            />
            <TextField
              {...register('slug')}
              error={!!formState.errors.slug}
              label={t('edit_profile.address')}
              helperText={formState.errors.slug?.message}
            />
            <TextField
              {...register('description')}
              error={!!formState.errors.description}
              label={t('edit_profile.description')}
              helperText={formState.errors.description?.message}
            />
          </div>
          <div className="flex mt-[83px] gap-[10px] tablet:mt-[25px]">
            <Button
              className="w-1/2"
              variant="outlined"
              size="xl"
              textColor="primary"
              type="button"
              onClick={onClose}
            >
              {t('edit_profile.cancel')}
            </Button>
            <Button
              className="w-1/2"
              variant="accent"
              size="xl"
              textColor="white"
              type="submit"
              disabled={
                formState.isSubmitting ||
                !formState.isValid ||
                !formState.isDirty
              }
            >
              {t('edit_profile.save')}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
