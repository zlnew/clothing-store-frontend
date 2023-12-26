interface ModalState {
  title?: string
  component: Component | null,
  componentProps?: Record<string, any>
}

export const useModalStore = defineStore('modal', () => {
  const modelValue = ref(false)
  const initialState = {
    title: '',
    component: null,
    componentProps: {}
  }

  const state = ref<ModalState>({ ...initialState })

  function open (newState: ModalState) {
    const component = newState.component && markRaw(newState.component)
    Object.assign(state.value, {
      ...newState,
      component
    })
    modelValue.value = true
  }

  function close () {
    Object.assign(state.value, initialState)
    modelValue.value = false
  }

  return {
    modelValue,
    state,
    open,
    close
  }
})
