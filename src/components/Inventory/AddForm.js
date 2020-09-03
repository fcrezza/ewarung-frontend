import React from 'react'
import useSWR from 'swr'
import {useForm, Controller} from 'react-hook-form'
import {Box} from '@chakra-ui/core'

import Modal from 'shared/Modal'
import {InputV2, NumberInput} from 'shared/Input'
import Combobox from 'shared/Combobox'
import Button from 'shared/Button'
import {useAuth} from 'libs/auth'
import axios from 'libs/axios'
import styles from './addform.module.css'

function AddForm({isOpen, onClose}) {
  const {user} = useAuth()
  const {data: suppliers} = useSWR(
    isOpen ? 'http://localhost:5000/suppliers' : null,
    (url) => axios.get(url).then((res) => res.data)
  )
  const {handleSubmit, control, formState} = useForm()

  const onSubmit = async (formState) => {
    await axios.post('http://localhost:5000/inventories', {
      idStore: user.store.id,
      ...formState
    })
    onClose()
  }

  return (
    <Modal title="Tambah barang" isOpen={isOpen} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={(props) => (
            <InputV2
              name="name"
              inputLabel="Nama barang"
              isRequired
              {...props}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={(props) => (
            <NumberInput
              id="price"
              inputLabel="Harga barang"
              isRequired
              {...props}
            />
          )}
        />
        <Controller
          control={control}
          name="stock"
          render={(props) => (
            <NumberInput
              id={'stock'}
              inputLabel="Stok barang"
              isRequired
              {...props}
            />
          )}
        />
        <Controller
          name="idSupplier"
          control={control}
          render={(props) => (
            <Combobox
              items={suppliers}
              inputLabel="Supplier barang"
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
