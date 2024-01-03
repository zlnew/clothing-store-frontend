<script setup lang="ts">
import { object, string, type InferType } from 'yup'

const toast = useToast()
const { updateCustomerDetails } = useProfile()
const { user, refresh } = useAuth()

const schema = object({
  phone_number: string().max(15).required('Required'),
  address: string().required('Required'),
  postal_code: string().max(5).required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  phone_number: user.value?.customer_details?.phone_number || '',
  address: user.value?.customer_details?.address || '',
  postal_code: user.value?.customer_details?.postal_code || ''
})

const { submit: save, processing: saving, validationMessage } = useSubmit(
  () => updateCustomerDetails(state), {
    onSuccess: async (result) => {
      toast.add({ title: result.status, color: 'green' })
      await refresh()
    }
  }
)
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="save">
    <div class="space-y-4">
      <div class="flex items-start gap-2">
        <UIcon name="i-mdi-account-details" class="text-2xl" />
        <div>
          <h2>Customer Details</h2>
          <p class="text-gray-600">Please fill out this form, so you will be able to finish your checkout</p>
        </div>
      </div>

      <ErrorNotification :message="validationMessage" @close="validationMessage = null" />
  
      <div class="space-y-2">
        <UFormGroup label="Phone Number" name="phone_number" required>
          <UInput
            v-model="state.phone_number"
            placeholder="Phone Number"
            size="xl"
          />
        </UFormGroup>
  
        <UFormGroup label="Address" name="address" required>
          <UTextarea
            v-model="state.address"
            placeholder="Address"
            size="xl"
          />
        </UFormGroup>
  
        <UFormGroup label="Postal Code" name="postal_code" required>
          <UInput
            v-model="state.postal_code"
            placeholder="Postal Code"
            size="xl"
          />
        </UFormGroup>
      </div>
  
      <div class="text-right">
        <UButton
          type="submit"
          block
          label="Save Changes"
          color="yellow"
          size="xl"
          :loading="saving"
        />
      </div>
    </div>
  </UForm>
</template>
