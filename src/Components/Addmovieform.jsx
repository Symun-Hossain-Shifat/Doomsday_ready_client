import { useState } from "react";
import Postmovies from "../API/PostMovies";

// Sample list for the UI only. Replace with your real movies later.
const sampleMovies = [
  "Iron Man",
  "Captain America: The First Avenger",
  "The Avengers",
  "Captain America: Civil War",
  "Thor: Ragnarok",
  "Avengers: Infinity War",
  "Avengers: Endgame",
];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function AddMovie() {
  const [open, setOpen] = useState(false);


const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const data = {
        title: form.get("title"),
        releaseYear: Number(form.get("releaseYear")),
        runtime: Number(form.get("runtime")),
        prerequisites: form.getAll("prerequisites"),
        watched: false ,
    };

    try {
        const result = await Postmovies(data);

        if (result.success === true) {
            alert(result.message);
            setOpen(false);
            e.target.reset();
        } else {
            alert(result.message || "Error adding movie");
        }

        console.log(result, data);

    } catch (error) {
        console.error("Movie submission failed:", error);
        alert("Something went wrong!");
    }
};

  return (
    <>
      {/* Add Movie button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg transition hover:brightness-110"
      >
        <span className="text-lg leading-none">+</span> Add Movie
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Add Movie</h2>
                <p className="text-sm text-slate-400">
                  Add a new movie to your collection.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-xl text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form (UI only) */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Field label="Movie Title">
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Iron Man"
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Release Year">
                  <input type="number" name="releaseYear" placeholder="2008" className={inputClass} />
                </Field>
                <Field label="Runtime (minutes)">
                  <input type="number" name="runtime" placeholder="126" className={inputClass} />
                </Field>
              </div>

              <Field label="Prerequisites">
                <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-white/10 bg-slate-800 p-2">
                  {sampleMovies.map((m) => (
                    <label
                      key={m}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-200 hover:bg-white/5"
                    >
                      <input type="checkbox" name="prerequisites" value={m} className="accent-amber-400" />
                      {m}
                    </label>
                  ))}
                </div>
                <span className="mt-1 block text-xs text-slate-500">
                  Movies to watch first (optional).
                </span>
              </Field>

             

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  
                  className="rounded-lg bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:brightness-110"
                >
                  Save Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}