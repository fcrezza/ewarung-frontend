/** @jsx jsx */
import React from 'react'
import {css, jsx} from '@emotion/core'
import {useForm, Controller} from 'react-hook-form'
import {Box} from '@chakra-ui/core'

import Modal from 'shared/Modal'
import {InputV2} from 'shared/Input'
import Button from 'shared/Button'
import {useAuth} from 'libs/auth'

function EditForm({isOpen, onClose, item}) {
  const {user} = useAuth()
  const {handleSubmit, control, formState} = useForm()

  const onSubmit = async (formState) => {
    /*
      logic for update item
    */
    onClose()
  }

  return (
    <Modal title="Edit supplier" isOpen={isOpen} onClose={onClose}>
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
            <InputV2 name="name" inputLabel="Nama" isRequired {...props} />
          )}
        />
        <Controller
          control={control}
          name="price"
          defaultValue={item?.address}
          render={(props) => (
            <InputV2 name="address" inputLabel="Alamat" isRequired {...props} />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          defaultValue={item?.phoneNumber}
          render={(props) => (
            <InputV2
              name="phoneNumber"
              inputLabel="No. Telepon"
              isRequired
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
    </Modal>
  )
}

export default EditForm
