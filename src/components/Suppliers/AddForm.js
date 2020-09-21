/** @jsx jsx */
import {useForm, Controller} from 'react-hook-form'
import {css, jsx} from '@emotion/core'
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

function AddForm({isOpen, onClose, handleAddItem}) {
  const {handleSubmit, control, errors, formState} = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (formState) => {
    await handleAddItem(formState)
    onClose()
  }

  return (
    <Modal title="Tambah supplier" isOpen={isOpen} onClose={onClose}>
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
            defaultValue=""
            control={control}
            render={(props) => (
              <InputV2
                name="name"
                inputLabel="Nama supplier"
                error={errors?.name}
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            defaultValue=""
            render={(props) => (
              <InputV2
                name="address"
                inputLabel="Alamat"
                error={errors?.address}
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue=""
            render={(props) => (
              <InputV2
                name="phoneNumber"
                inputLabel="No. Telepon"
                error={errors?.phoneNumber}
                {...props}
              />
            )}
          />
          <Box marginBottom="4">
            <Button type="submit" block isDisabled={formState.isSubmitting}>
              Tambah
            </Button>
          </Box>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default AddForm
