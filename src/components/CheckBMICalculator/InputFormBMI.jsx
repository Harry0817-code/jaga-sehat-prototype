import React from 'react';
import { useFormContext } from "react-hook-form";

function InputFormBMI({ onSubmit, repeatSuggest }) {
  const { register } = useFormContext();

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>

        {/* Untuk kolom Jenis Kelamin */}
        <div className="form-group">
          <label htmlFor="gender">Jenis Kelamin</label>
          <select id="gender" {...register("gender", { required: true })}>
            <option value="" disabled>SELECT</option>
            <option value="Laki - Laki">Laki - Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* Untuk kolom Umur? */}
        <div className="form-group">
          <label htmlFor="age">Usia (tahun)</label>
          <div className="input-with-arrows">
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              min="1"
              max="120"
              {...register("age", { required: true })}
            />
          </div>
        </div>

        {/* Untuk kolom Tinggi Badan */}
        <div className="form-group">
          <label htmlFor="height">INPUT HEIGHT</label>
          <div className="input-with-arrows">
            <input
              id="height"
              type="number"
              placeholder="Enter your height"
              min="50"
              max="300"
              step="0.1"
              {...register("height", { required: true })}
            />
          </div>
        </div>

        {/* Untuk kolom Berat Badan */}
        <div className="form-group">
          <label htmlFor="weight">INPUT WEIGHT</label>
          <div className="input-with-arrows">
            <input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              min="1"
              max="500"
              step="0.1"
              {...register("weight", { required: true })}
            />
          </div>
        </div>

        {/* tombol submit */}
        <button type="submit" className="submit-btn" disabled={repeatSuggest}>
          Hitung BMI dan Dapatkan Saran AI
        </button>
      </form>
    </div>
  );
}

export default InputFormBMI;