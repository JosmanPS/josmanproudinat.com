import React from 'react'

export default function GetRevueForm() {
  return (
    <div className='bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600 py-8 px-6 mb-8'>
      <h2 className='text-3xl font-bold mb-4'>¡Suscríbete!</h2>
      <p className='mb-4'>
        Si deseas ser notificado cada vez que se publique un nuevo post, te
        invito a suscribirte.
      </p>
      <form
        action='https://www.getrevue.co/profile/josmanproudinat/add_subscriber'
        method='post'
        id='revue-form'
        name='revue-form'
        target='_blank'
      >
        <div className='mb-4'>
          <input
            className='w-full rounded'
            placeholder='Email *'
            type='email'
            name='member[email]'
            id='member_email'
          />
        </div>
        <div className='mb-4'>
          <input
            className='w-full rounded'
            placeholder='Nombre'
            type='text'
            name='member[first_name]'
            id='member_first_name'
          />
        </div>
        <div className='mb-4'>
          <input
            className='w-full rounded'
            placeholder='Apellido'
            type='text'
            name='member[last_name]'
            id='member_last_name'
          />
        </div>
        <div className='mb-4'>
          <input
            className='btn-primary w-full rounded'
            type='submit'
            value='Suscríbete'
            name='member[subscribe]'
            id='member_submit'
          />
        </div>
        <div className='text-gray-500 text-sm'>
          By subscribing, you agree with Revue’s{' '}
          <a target='_blank' href='https://www.getrevue.co/terms'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a target='_blank' href='https://www.getrevue.co/privacy'>
            Privacy Policy
          </a>
          .
        </div>
      </form>
    </div>
  )
}
