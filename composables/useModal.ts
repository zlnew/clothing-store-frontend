type ModalState = {
  title?: string
  component: Component | null,
  componentProps?: Record<string, any>
}

export const useModal = () => {
  const initialState = {
    title: undefined,
    component: null,
    componentProps: {}
  }
  const instance = useState('modalInstance', () => false)
  const state = useState<ModalState>('modalState', () => initialState)

  function open (newState: ModalState) {
    const component = newState.component && markRaw(newState.component)
    state.value = { ...newState, component }
    instance.value = true
  }

  function close () {
    state.value = initialState
    instance.value = false
  }

  return {
    instance,
    state,
    open,
    close
  }
}
