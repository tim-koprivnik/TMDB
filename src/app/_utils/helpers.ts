export const formatTitle = (item: { title?: string; name?: string }) => {
  if (item.title) {
    return item.title;
  }
  if (item.name) {
    return item.name;
  }
  return 'Unknown title';
};

export const getMediaType = (item: {
  media_type?: string;
  title?: string;
  name?: string;
}) => {
  if (item.media_type) {
    return item.media_type;
  }
  if (item.title) {
    return 'movie';
  }
  if (item.name) {
    return 'tv';
  }
  return 'unknown';
};

export const formatDate = (
  dateString: string | undefined,
  useLocale = true
) => {
  if (!dateString) {
    return 'Unknown date';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  if (useLocale) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const removeDuplicates = <T extends Record<string, unknown>>(
  arr: T[],
  ...keys: (keyof T)[]
) => {
  const seen = new Set<string>();
  return arr.filter(item => {
    const combinedKey = keys
      .map(key => String(item[key]))
      .join('|')
      .toLowerCase();
    if (seen.has(combinedKey)) {
      return false;
    }
    seen.add(combinedKey);
    return true;
  });
};

export const formatRuntime = (
  mediaType: string,
  item: { runtime?: number; episode_run_time?: number[] }
) => {
  if (mediaType === 'movie') {
    const hours = Math.floor((item.runtime || 0) / 60);
    const minutes = (item.runtime || 0) % 60;
    return `${hours}h ${minutes}m`;
  }

  if (mediaType === 'tv') {
    if (item.episode_run_time && item.episode_run_time.length > 0) {
      return `${item.episode_run_time[0]} min`;
    }
    return '';
  }

  return '';
};

export const formatCount = (number: number): string => {
  if (number >= 1000) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  }

  return number.toString();
};

export const getPages = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const MAX_VISIBLE_PAGES = 10;
  const pages: (number | string)[] = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= MAX_VISIBLE_PAGES - 3) {
    for (let i = 1; i <= MAX_VISIBLE_PAGES - 3; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages - 1);
    pages.push(totalPages);
  } else if (currentPage >= totalPages - MAX_VISIBLE_PAGES + 4) {
    pages.push(1);
    pages.push(2);
    pages.push('...');
    for (let i = totalPages - MAX_VISIBLE_PAGES + 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push(2);
    pages.push('...');
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages - 1);
    pages.push(totalPages);
  }

  return pages;
};

export const generateMediaURL = (
  mediaType: string,
  id: string | number,
  value: string | undefined | null
): string => {
  const sanitizedValue = value
    ? value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '-')
    : '';
  return `/${mediaType}/${id}-${sanitizedValue}`;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
}
