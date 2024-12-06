import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import Link from 'next/link';
export default function AddSchool() {
  // Destructure the necessary methods and states from useForm
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append each form field and file to the FormData object
    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        // If the field is 'image', append the file directly
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    // Send the formData to the backend API
    const res = await fetch('/api/schools', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('School added successfully!');
      reset(); // Reset the form after successful submission

      // Clear the file input manually after form reset
      document.querySelector('input[type="file"]').value = '';

      // Navigate to the home page after successful submission
      router.push('/'); // Navigate to the home page
    } else {
      alert('Error adding school.');
    }
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        {/* Input fields with validation */}
        <input
          className="form-input"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          className="form-input"
          placeholder="Address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        <input
          className="form-input"
          placeholder="City"
          {...register('city')}
        />

        <input
          className="form-input"
          placeholder="State"
          {...register('state')}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Contact"
          {...register('contact', { required: 'Contact is required' })}
        />
        {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

        <input
          className="form-input"
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          className="form-input"
          type="file"
          {...register('image', { required: 'Image is required' })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <button className="btn-primary">Submit</button>
        <div className='btn-primary'>
       <Link href='/'><button >Back to Home</button>
       </Link>
        </div>
        </form>
    </div>
  );
}
