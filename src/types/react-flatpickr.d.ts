declare module 'react-flatpickr' {
    import * as React from 'react';

    interface FlatpickrProps {
      options?: any; // You can define more specific types here if needed
      onChange?: (date: Date[]) => void;
      value?: Date | Date[];
      [key: string]: any; // Allow additional props
    }

    const Flatpickr: React.FC<FlatpickrProps>;

    export default Flatpickr;
  }
