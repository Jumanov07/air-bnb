import * as Yup from 'yup';
// import { Rating } from 'react-simple-star-rating';
import shui from '../../assets/images/shui.png';
import batken from '../../assets/images/batken.png';
import jalajabat from '../../assets/images/jalalabat.png';
import naryn from '../../assets/images/naryn.png';
import issykKul from '../../assets/images/issykKul.png';
import bishkek from '../../assets/images/bishkek.png';
import talas from '../../assets/images/talas.png';
import osh from '../../assets/images/osh.png';
import imag1 from '../../assets/images/imag1.png';
import imag2 from '../../assets/images/imag2.png';
import imag3 from '../../assets/images/imag3.png';
import imag5 from '../../assets/images/kartinka.png';

export const BASE_URL =
   'http://ec2-3-67-201-139.eu-central-1.compute.amazonaws.com/api/';
export const LOGIN_INFO_LS_KEY = '@AIR_BNB_LOGIN_INFO';

export const validationFormikThema = Yup.object().shape({
   maxOfGuests: Yup.number('').required(
      'Обязательно укажите количества жителей!'
   ),
   price: Yup.number('').required('Введите  обязательно сумму!'),
   title: Yup.string('').required('напишите название дома!'),
   descriptionOfListing: Yup.string('').required('Напишите  комментарий!'),
   location: Yup.object({
      region: Yup.string('').required('укажите ваш регион!'),
      townOrProvince: Yup.string('').required('Напишите  ваш город!'),
      address: Yup.string('').required('Напишите  ваш адрес!'),
   }),
});

export const ratingSelect = [
   {
      label: 'Five',
      id: 1,
   },
   {
      label: 'Four',
      id: 2,
   },
   {
      label: 'Three',
      id: 3,
   },
   {
      label: 'Two',
      id: 4,
   },
   {
      label: 'One',
      id: 5,
   },
];
export const sort = [
   {
      id: 1,
      label: 'All',
   },
   {
      id: 2,
      label: 'In wish list',
   },
   {
      id: 3,
      label: 'Apartment',
   },
   {
      id: 4,
      label: 'House',
   },
];

export const imgs = [
   { id: 0, value: imag1 },
   { id: 1, value: imag2 },
   { id: 2, value: imag3 },
   { id: 3, value: imag5 },
];

export const paths = [
   {
      id: 1,
      label: 'Batken',
   },
   {
      id: 2,
      label: 'Jalalabat',
   },
   {
      id: 3,
      label: 'Naryn',
   },
   {
      id: 4,
      label: 'Issyk-Kul',
   },
   {
      id: 5,
      label: 'Talas',
   },
   {
      id: 6,
      label: 'Osh',
   },
   {
      id: 7,
      label: 'Chui',
   },
   {
      id: 8,
      label: 'Bushkek',
   },
];
export const ROLES = {
   ADMIN: {
      path: '/admin/*',
   },
   USER: {
      path: '/user/',
   },
};

export const option = [
   { label: 'Batken', value: 'Batken' },
   { label: 'Jalal-Abad', value: 'Jalal-Abad' },
   { label: 'Naryn', value: 'Naryn' },
   { label: 'Issyk-Kul', value: 'Issyk-Kul' },
   { label: 'Talas', value: 'Talas' },
   { label: 'Osh', value: 'Osh' },
   { label: 'Chui', value: 'Chui' },
   { label: 'Bishkek', value: 'Bishkek' },
];
export const homeType = [
   { label: 'Popular', value: 'Popular' },
   { label: 'The latest', value: 'The latest' },
];
export const homeTypeSecond = [
   { label: 'Apartment', value: 'Apartment' },
   { label: 'House', value: 'House' },
];
export const homePrice = [
   { label: 'Low to high', value: 'Low to high' },
   { label: 'High to low', value: 'High to low' },
];
export const filterByArr = [
   { value: 'BOOKED', label: 'BOOKED' },
   { value: 'NOT_BOOKED', label: 'NOT_BOOKED' },
];

export const sortByArr = [
   { value: 'Popular', label: 'Popular' },
   { value: 'The latest', label: 'The latest' },
];
export const FilterByHomeType = [
   { value: 'Apartment', label: 'Apartment' },
   { value: 'House', label: 'House' },
];

export const FilterByPrice = [
   { value: 'Low to high', label: 'Low to high' },
   { value: 'High to low', label: 'High to low' },
];
export const itemData = [
   {
      img: shui,
      path: 'Chui',
      rows: 4,
      cols: 2,
      description: 'Chui',
      region: 'Chui',
   },
   {
      img: batken,
      path: 'Batken',
      cols: 1,
      rows: 2,
      description: 'Batken',
      region: 'Batken',
   },
   {
      img: jalajabat,
      path: 'Jalal-Abad',
      cols: 1,
      rows: 2,
      description: 'Jalal-Abad',
      region: 'Jalal-abad',
   },
   {
      img: naryn,
      path: 'Naryn',
      cols: 2,
      rows: 2,
      description: 'Naryn',
      region: 'Naryn',
   },
   {
      img: issykKul,
      path: 'Issyk-Kul',
      cols: 1,
      rows: 2,
      description: 'Issyk-Kul',
      region: 'Issyk-Kul',
   },
   {
      img: talas,
      path: 'Talas',
      cols: 1,
      rows: 2,
      description: 'Talas',
      region: 'Talas',
   },
   {
      img: osh,
      rows: 4,
      cols: 2,
      path: 'Osh',
      description: 'Osh',
      region: 'Osh',
   },
   {
      img: bishkek,
      path: 'Bishkek',
      cols: 2,
      rows: 2,
      description: 'Bishkek',
      region: 'Bishkek',
   },
];

export const forRegion = {
   initial: {
      opacity: 0,
      y: '-100vh',
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
      },
   },
};
export const forSort = {
   initial: {
      opacity: 0,
      y: '-100vh',
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 1,
      },
   },
};
export const filterByHome = {
   initial: {
      opacity: 0,
      y: '-100vh',
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 2,
      },
   },
};
export const filterByType = {
   initial: {
      opacity: 0,
      y: '-100vh',
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 3,
      },
   },
};
