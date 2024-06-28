import { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
// import { Testimonials } from '../components/Testimonials';
import AddToChromeButton from "../components/AddToChromeButton";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NextRole Resume Customization</title>
      </Head>
      <section className='flex flex-1 flex-grow w-full flex-col items-center justify-center text-center px-4 mt-20'>
        {/*<a*/}
        {/*  href='https://twitter.com/nutlope/status/1704894145003741611'*/}
        {/*  target='_blank'*/}
        {/*  rel='noreferrer'*/}
        {/*  className='border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out'*/}
        {/*>*/}
        <div className='border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out'>
          Used by <span className='font-semibold'>many</span> happy
          users
        </div>
        {/*</a>*/}
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl'>
          Customize your resume{' '}
          <span className='relative whitespace-nowrap text-blue-600'>
            <SquigglyLines />
            <span className='relative'>using AI</span>
          </span>{' '}
        </h1>

        <p className='mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7'>
          Tired of customizing your resume for every role? Let NextRole automatically customize, polish, and generate submission-ready PDF resume for you!
        </p>
        <div className='flex justify-center space-x-4 mt-4 mb-4'>
          <AddToChromeButton/>
        </div>


        <div className='flex justify-between items-center w-full flex-col sm:mt-10 mt-6'>
          <div className='flex flex-col space-y-10 mt-4 mb-20'>
            <div className='flex sm:space-x-2 sm:flex-row flex-col'>
              <div>
                {/*<h2 className='mb-1 font-medium text-lg'>Original Photo</h2>*/}
                {/*<img*/}
                {/*  alt='Original photo of my bro'*/}
                {/*  src='/michael.jpg'*/}
                {/*  className='w-96 h-96 rounded-2xl'*/}
                {/*  width={400}*/}
                {/*  height={400}*/}
                {/*/>*/}
              </div>
              {/*<div className='sm:mt-0 mt-8'>*/}
              {/*  <h2 className='mb-1 font-medium text-lg'>Restored Photo</h2>*/}
              {/*  <Image*/}
              {/*    alt='Restored photo of my bro'*/}
              {/*    width={400}*/}
              {/*    height={400}*/}
              {/*    src='/michael-new.jpg'*/}
              {/*    className='w-96 h-96 rounded-2xl sm:mt-0 mt-2'*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </section>
      {/*<Testimonials />*/}
    </div>
  );
};

export default Home;
