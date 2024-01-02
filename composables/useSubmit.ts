export type ValidationErrors = Record<string, string[]>

export type UseSubmitOptions = {
  onSuccess?: (result: any) => any
  onError?: (result: any) => any
}

export function useSubmit<T>(
  fetchable: () => Promise<T>,
  options: UseSubmitOptions = {}
) {
  const validationErrors = ref<ValidationErrors>({})
  const validationMessage = ref<string | null>(null)
  const error = ref<Error | null>(null)
  const processing = ref(false)
  const succeeded = ref<boolean | null>(null)

  async function submit () {
    validationErrors.value = {}
    validationMessage.value = null
    error.value = null
    processing.value = true
    succeeded.value = null

    try {
      const data = await fetchable()
      succeeded.value = true
      options.onSuccess?.(data)
      return data
    } catch (e: any) {
      error.value = e
      succeeded.value = false
      options.onError?.(e)
      validationErrors.value = e.data?.errors ?? {}
      validationMessage.value = e.data?.message ?? null

      if (e.response?.status !== 422) throw e
    } finally {
      processing.value = false
    }
  }

  return {
    submit,
    processing,
    succeeded,
    validationErrors,
    validationMessage,
    error
  }
}
