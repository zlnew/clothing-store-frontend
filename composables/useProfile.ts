export type UpdateAccountBody = {
  name: string
  email: string
}

export type UpdateCustomerDetailsBody = {
  phone_number: string
  address: string
  postal_code: string
}

export type ChangePasswordBody = {
  current_password: string
  password: string
  password_confirmation: string
}

export const useProfile = () => {
  async function updateAccount (body: UpdateAccountBody) {
    return $larafetch<{ message: string }>('/api/profiles/account', {
      method: 'patch',
      body
    })
  }

  async function updateCustomerDetails (body: UpdateCustomerDetailsBody) {
    return $larafetch<{ message: string }>('/api/profiles/customer-details', {
      method: 'patch',
      body
    })
  }

  async function changePassword (body: ChangePasswordBody) {
    return $larafetch<{ message: string }>('/api/profiles/change-password', {
      method: 'patch',
      body
    })
  }

  return {
    updateAccount,
    updateCustomerDetails,
    changePassword
  }
}
