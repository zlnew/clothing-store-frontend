<script setup lang="ts">
import { object, string, type InferType } from 'yup'

const toast = useToast()
const { updateAccount } = useProfile()
const { user, resendEmailVerification, refresh } = useAuth()

const schema = object({
  name: string().max(50).required('Required'),
  email: string().email('Invalid email').required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  name: user.value?.name || '',
  email: user.value?.email || ''
})

const { submit: update, processing: updating, validationMessage } = useSubmit(
  () => updateAccount(state), {
    onSuccess: async (result) => {
      toast.add({ title: result.status, color: 'green' })
      await refresh()
    }
  }
)

const { submit: verifyEmail, processing: sendingVerification } = useSubmit(
  () => resendEmailVerification(), {
    onSuccess: (result) => toast.add({ title: result.status, color: 'green', timeout: 0 }),
    onError: () => toast.add({
      title: 'An error occured when sending verification email',
      color: 'red',
      timeout: 0
    })
  }
)
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="update">
    <div class="space-y-4">
      <div class="flex items-start gap-2">
        <UIcon name="i-mdi-user" class="text-2xl" />
        <div>
          <h2>Account</h2>
          <p class="text-gray-600">You can change your name, email, and password</p>
        </div>
      </div>

      <ErrorNotification :message="validationMessage" @close="validationMessage = null" />
  
      <div class="space-y-2">
        <UFormGroup label="Name" name="name" required>
          <UInput
            v-model="state.name"
            placeholder="Name"
            size="xl"
          />
        </UFormGroup>
  
        <UFormGroup label="Email Address" name="email" :hint="!user?.email_verified_at ? 'Please verify your email address' : ''" required>
          <div class="flex gap-1">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="Email"
              size="xl"
              class="w-full"
            />
            <UButton
              v-if="!user?.email_verified_at"
              label="Verify"
              color="black"
              variant="outline"
              size="xl"
              :loading="sendingVerification"
              @click="verifyEmail"
            />
          </div>
        </UFormGroup>
      </div>
  
      <div class="flex items-center justify-between gap-2">
        <UButton
          to="/my-profile/change-password"
          label="Change Password"
          color="black"
          size="xl"
        />
        <UButton
          type="submit"
          label="Save Changes"
          color="yellow"
          size="xl"
          :loading="updating"
        />
      </div>
    </div>
  </UForm>
</template>
