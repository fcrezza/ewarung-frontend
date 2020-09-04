/** @jsx jsx */
import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {css, jsx} from '@emotion/core'
import {Box} from '@chakra-ui/core'

import Modal from 'shared/Modal'
import {InputV2} from 'shared/Input'
import Button from 'shared/Button'
import {useAuth} from 'libs/auth'
import axios from 'libs/axios'

function AddForm({isOpen, onClose}) {
  const {user} = useAuth()
  const {handleSubmit, control, formState} = useForm()

  const onSubmit = async (formState) => {
    await axios.post('http://localhost:5000/suppliers', {
      idStore: user.store.id,
      ...formState
    })
    onClose()
  }

  return (
    <Modal title="Tambah supplier" isOpen={isOpen} onClose={onClose}>
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
              isRequired
              {...props}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={(props) => (
            <InputV2 name="address" inputLabel="Alamat" isRequired {...props} />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
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
            Tambah
          </Button>
        </Box>
      </form>
    </Modal>
  )
}

export default AddForm
