/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useForm, Controller} from 'react-hook-form'
import {Box} from '@chakra-ui/core'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'

import {Modal, ModalBody} from 'shared/Modal'
import {InputV2} from 'shared/Input'
import Button from 'shared/Button'

const validationSchema = object().shape({
  name: string().required('nama tidak boleh kosong'),
  address: string().required('Alamat tidak boleh kosong'),
  phoneNumber: string().required('Nomor Telepon tidak boleh kosong')
})

function EditForm({isOpen, onClose, item, handleEditItem}) {
  const {handleSubmit, control, errors, formState} = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (formState) => {
    const data = Object.assign(item, formState)
    await handleEditItem(data)
    onClose()
  }

  return (
    <Modal title="Edit supplier" isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <form
          css={css`
            & > *:not(:last-child) {
              margin-bottom: 1rem;
            }
          `}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            defaultValue={item?.name}
            control={control}
            render={(props) => (
              <InputV2
                name="name"
                error={errors.name}
                inputLabel="Nama"
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            defaultValue={item?.address}
            render={(props) => (
              <InputV2
                name="address"
                error={errors.address}
                inputLabel="Alamat"
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue={item?.phoneNumber}
            render={(props) => (
              <InputV2
                name="phoneNumber"
                error={errors.phoneNumber}
                inputLabel="No. Telepon"
                {...props}
              />
            )}
          />
          <Box marginBottom="4">
            <Button type="submit" block isDisabled={formState.isSubmitting}>
              Simpan
            </Button>
          </Box>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default EditForm
