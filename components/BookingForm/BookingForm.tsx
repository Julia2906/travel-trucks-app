'use client';

import { useState } from 'react';
import css from './BookingForm.module.css';

type Props = {
  camperId?: string; // якщо хочеш прив’язати бронювання до конкретного кемпера
};

type FormState = {
  name: string;
  email: string;
  date: string;
  comment: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  date: '',
  comment: '',
};

export default function BookingForm({ camperId }: Props) {
  const [values, setValues] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setError(null);
    setIsSuccess(false);
  };

  const validate = (): string | null => {
    if (!values.name.trim()) return 'Name is required';
    if (!values.email.trim()) return 'Email is required';

    // простенька перевірка email
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!emailOk) return 'Enter a valid email';

    if (!values.date) return 'Booking date is required';
    return null;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = {
        ...values,
        camperId: camperId ?? null,
      };

      // якщо в тебе вже є свій ендпоінт — підстав сюди
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to send booking');
      }

      setIsSuccess(true);
      setValues(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={css.card} aria-label="Booking form">
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>

      <form className={css.form} onSubmit={onSubmit} noValidate>
        {/* sr-only лейбли для доступності */}
        <label className={css.srOnly} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className={css.input}
          type="text"
          placeholder="Name*"
          value={values.name}
          onChange={onChange}
          autoComplete="name"
        />

        <label className={css.srOnly} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          className={css.input}
          type="email"
          placeholder="Email*"
          value={values.email}
          onChange={onChange}
          autoComplete="email"
        />

        <label className={css.srOnly} htmlFor="date">
          Booking date
        </label>
        <input
          id="date"
          name="date"
          className={css.input}
          type="date"
          placeholder="Booking date*"
          value={values.date}
          onChange={onChange}
        />

        <label className={css.srOnly} htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          className={css.textarea}
          placeholder="Comment"
          value={values.comment}
          onChange={onChange}
          rows={5}
        />

        {error && <p className={css.error}>{error}</p>}
        {isSuccess && <p className={css.success}>Sent! We’ll contact you soon 💌</p>}

        <button className={css.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </section>
  );
}
