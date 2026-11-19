
import { useEffect, useState } from "react";
import getmovies from "../API/GetMovies";

const formatRuntime = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;

  return h ? `${h}h ${m}m` : `${m}m`;
};

function Stat({ label, value, icon, accent }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#111827] p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{label}</p>

        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${accent}`}>
          {icon}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="h-72 animate-pulse rounded-2xl border border-white/10 bg-[#111827]" />
  );
}

export function Showmovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getmovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="min-h-screen bg-[#080d18] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Hero Header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#25101b] via-[#151827] to-[#0d1423] p-7 sm:p-10">

          <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-[100px]" />

          <div className="relative z-10 max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-red-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Doomsday Ready
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The Marvel
              <span className="block text-red-500">
                Movie Universe.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Your MCU collection starts here. Explore your movies,
              discover their details and get ready for Avengers: Doomsday.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>✦ Your Collection</span>
              <span className="text-gray-600">/</span>
              <span>Movie Collection</span>
            </div>

          </div>

          <div className="pointer-events-none absolute -bottom-10 right-8 hidden text-[190px] font-black italic leading-none text-white/[0.035] lg:block">
            MCU
          </div>
        </div>

        {/* Statistics */}
        {!loading && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <Stat
              label="Total Movies"
              value={movies.length}
              icon="🎬"
              accent="bg-blue-500/10"
            />

            <Stat
              label="Watched Movies"
              value="0"
              icon="✓"
              accent="bg-green-500/10 text-green-400"
            />

            <Stat
              label="Remaining Movies"
              value="0"
              icon="◷"
              accent="bg-red-500/10 text-red-400"
            />

          </div>
        )}

        {/* Collection Header */}
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-red-500">
              Your Collection
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore All Movies
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Explore your Marvel movie collection.
            </p>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-[#111827] px-5 py-20 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
              🎬
            </div>

            <h3 className="text-xl font-bold text-white">
              No Movies Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No movies available in this collection.
            </p>

          </div>
        )}

        {/* Movie Cards */}
        {!loading && movies.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {movies.map((movie, index) => (
              <article
                key={movie._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/20"
              >

                {/* Card Top Accent */}
                <div className="h-1 w-full bg-red-600" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  {/* Card Header */}
                  <div className="mb-5 flex items-start justify-between gap-3">

                    <div>
                      <span className="text-xs font-bold tracking-widest text-gray-600">
                        MOVIE {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-3 text-xl font-bold leading-snug text-white transition group-hover:text-red-400">
                        {movie.title?.trim()}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                      Movie
                    </span>

                  </div>

                  {/* Movie Details */}
                  <div className="mb-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl border border-white/5 bg-[#0b1220] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Release Year
                      </p>

                      <p className="mt-2 text-xl font-bold text-white">
                        {movie.releaseYear}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-[#0b1220] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Runtime
                      </p>

                      <p className="mt-2 text-xl font-bold text-white">
                        {formatRuntime(movie.runtime)}
                      </p>
                    </div>

                  </div>

                  {/* Prerequisites */}
                  <div className="mt-auto">

                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Watch Before
                      </p>

                      <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400">
                        {movie.prerequisites?.length || 0}
                      </span>
                    </div>

                    {movie.prerequisites?.length ? (
                      <div className="flex flex-wrap gap-2">

                        {movie.prerequisites.map((p) => (
                          <span
                            key={p}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300"
                          >
                            {p}
                          </span>
                        ))}

                      </div>
                    ) : (
                      <p className="text-sm italic text-gray-600">
                        No prerequisites
                      </p>
                    )}

                  </div>

                </div>
                {/* Action Buttons */}
<div className="mt-6 pb-4 px-3 grid grid-cols-2 gap-3">

  {/* Watched Button */}
  <button
    type="button"
    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold"
  >
   
   Not Watched
  </button>

  {/* Edit Button */}
  <button
    type="button"
    className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
  >
    <span>✎</span>
    Edit Movie
  </button>

</div>
              </article>
            ))}

          </div>
        )}

        {/* Collection Footer */}
        {!loading && movies.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500">

            <p>
              Showing {movies.length} of {movies.length} movies
            </p>

            <p className="font-semibold tracking-wider">
              DOOMSDAY READY
            </p>

          </div>
        )}

      </div>
    </section>
  );
}
