/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MOVIEDB_BASE_URL = 'https://api.themoviedb.org/3';

const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

export interface Media {
  [key: string]: string | number | string[] | number[] | undefined;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface MediaResponse {
  page: number;
  results: Media[];
  total_pages: number;
}

interface TransformedMediaResponse {
  totalPages: number;
  results: Media[];
}

export interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

const mediaApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: MOVIEDB_BASE_URL }),
  tagTypes: ['Media'],
  endpoints: builder => ({
    fetchMedia: builder.query<
      TransformedMediaResponse,
      {
        mediaType: string;
        activeSort: string;
        activeFilter: number[];
        page: number;
      }
    >({
      query: ({ mediaType, activeSort, activeFilter, page }) => ({
        url: `/discover/${mediaType}`,
        params: {
          sort_by: activeSort,
          with_genres: activeFilter.join(','),
          api_key: MOVIEDB_API_KEY,
          page,
        },
      }),
      transformResponse: (
        response: MediaResponse
      ): TransformedMediaResponse => {
        const { total_pages, results } = response;
        return { totalPages: total_pages, results };
      },
      providesTags: (result, error, { mediaType }) => [
        { type: 'Media', mediaType },
      ],
    }),
    fetchGenres: builder.query<GenreResponse, { mediaType: string }>({
      query: ({ mediaType }) =>
        `/genre/${mediaType}/list?api_key=${MOVIEDB_API_KEY}`,
    }),
  }),
});

export const { useFetchMediaQuery, useFetchGenresQuery } = mediaApi;

export default mediaApi;
