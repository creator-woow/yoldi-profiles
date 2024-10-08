import { FC, PropsWithChildren } from 'react';

import { Button, Form, Modal, TextField } from 'shared/ui';
import { useForm, useTranslations, zodResolver } from 'shared/lib';
import { Profile } from 'entities/profile';

import { EditProfileData, EditProfileDataSchema } from '../model/schema';

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
    mode: 'onChange',
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

  const beforeAddressInput = (
    <div className="flex items-center text-secondary bg-secondary border-r-1 border-inherit px-[20px] max-w-[50%]">
      <span className="truncate">{window.location.host}/</span>
    </div>
  );

  return (
    <Modal
      className="p-[30px] tablet:w-[600px]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="title-md mb-[25px] whitespace-pre-line tablet:whitespace-nowrap">
        {t('edit_profile.title')}
      </h2>
      <Form onSubmit={submit}>
        <div className="flex flex-col gap-[15px]">
          <TextField
            {...register('name')}
            autoFocus
            error={!!formState.errors.name}
            label={t('edit_profile.name')}
            helperText={formState.errors.name?.message}
          />
          <TextField
            {...register('slug')}
            beforeInput={beforeAddressInput}
            error={!!formState.errors.slug}
            label={t('edit_profile.address')}
            helperText={formState.errors.slug?.message}
          />
          <TextField
            {...register('description')}
            multiline
            minRows={5}
            maxRows={10}
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
            type="submit"
            disabled={
              formState.isSubmitting || !formState.isValid || !formState.isDirty
            }
          >
            {t('edit_profile.save')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
