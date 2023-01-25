import React from 'react'

export default function SubstackForm() {
  return (
    <div className="mb-8">
      <form
        action="https://josmanproudinat.substack.com/api/v1/free?nojs=true"
        method="post"
        className="form "
        noValidate
      >
        <input
          type="hidden"
          name="first_url"
          value="https://josmanproudinat.substack.com/embed"
        />
        <input
          type="hidden"
          name="first_referrer"
          value="http://127.0.0.1:3000/"
        />
        <input
          type="hidden"
          name="current_url"
          value="https://josmanproudinat.substack.com/embed"
        />
        <input
          type="hidden"
          name="current_referrer"
          value="http://127.0.0.1:3000/"
        />
        <input type="hidden" name="referral_code" />
        <input type="hidden" name="source" value="embed" />
        <input type="hidden" name="referring_pub_id" />
        <input type="hidden" name="additional_referring_pub_ids" />
        <div className="sideBySideWrap">
          <input type="email" name="email" placeholder="Type your email…" />
          <button
            className="button rightButton  primary subscribe-btn"
            type="submit"
            tabIndex={0}
          >
            <b className="button-text ">Subscribe</b>
          </button>
        </div>
        <div id="error-container">
          <div className="error other-error">Please enter a valid email</div>
        </div>
        <div className="subtle-help-text below-input"></div>
      </form>
    </div>
  )
}
