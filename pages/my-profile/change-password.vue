<script setup lang="ts">
import { object, string, ref as yupRef, type InferType } from 'yup'

definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Change Password' })

const toast = useToast()
const { changePassword } = useProfile()

const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'My Profile', to: '/my-profile' },
  { label: 'Change Password' }
]

const schema = object({
  current_password: string().min(8).required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
  password_confirmation: string().required('Required')
    .oneOf([yupRef('password')], 'Passwords do not match.')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const { submit: change, processing: changing, validationMessage } = useSubmit(
  () => changePassword(state), {
    onSuccess: result => toast.add({ title: result.status, color: 'green' })
  }
)
</script>

<template>
  <PageContainer constrained="max-w-xl" :breadcrumb-links="breadcrumbLinks">
    <UForm :state="state" :schema="schema" @submit="change">
      <div class="space-y-4">
        <ErrorNotification :message="validationMessage" @close="validationMessage = null" />

        <div class="space-y-2">
          <UFormGroup label="Current Password" name="current_password" required>
            <UInput
              v-model="state.current_password"
              type="password"
              placeholder="Current Password"
              size="xl"
            />
          </UFormGroup>

          <UFormGroup label="New Password" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="New Password"
              size="xl"
            />
          </UFormGroup>

          <UFormGroup label="Confirm New Password" name="password_confirmation" required>
            <UInput
              v-model="state.password_confirmation"
              type="password"
              placeholder="Confirm New Password"
              size="xl"
            />
          </UFormGroup>
        </div>

        <div class="text-right">
          <UButton
            type="submit"
            block
            label="Change Password"
            color="yellow"
            size="xl"
            :loading="changing"
          />
        </div>
      </div>
    </UForm>
  </PageContainer>
</template>
