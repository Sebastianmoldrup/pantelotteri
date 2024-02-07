import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { HamburgerIcon } from '@/components/icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import bwipjs from 'bwip-js';

export default function Navigation() {
  const supabase = createClient();
  const [barcode, setBarcode] = useState('');
  console.log(barcode);

  (async () => {
    // const supabase = createClient();

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        setBarcode(data.session?.user.id ?? '');
      } else if (error) {
        console.error(error);
      }
    }
    loadSession();
  })();

  let svg;
  async function loadSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setBarcode(data.session?.user.id ?? '');
      barcode
        ? (svg = bwipjs.toSVG({
            bcid: 'code128',
            text: barcode,
            height: 15,
            textxalign: 'center',
            textcolor: 'ff0000',
          }))
        : null;
    } else if (error) {
      console.error(error);
    }
  }
  loadSession();

  // let svg = bwipjs.toSVG({
  //   bcid: 'code128',
  //   text: barcode,
  //   height: 15,
  //   textxalign: 'center',
  //   textcolor: 'ff0000',
  // });

  return (
    <nav className='flex justify-between px-4 py-2 w-full'>
      <h1 className='text-md font-bold'>Norsk pantelotteri</h1>

      <Drawer>
        <DrawerTrigger>
          <HamburgerIcon />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Din strekkode</DrawerTitle>
            <div className='flex flex-col justify-center'>
              {/* <div dangerouslySetInnerHTML={{ __html: svg }} /> */}
              {svg}
            </div>
            <DrawerDescription>
              Bruk denne for å registrere glass og metal avfall
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <div className='flex justify-evenly'>
              <Button>Spill regler</Button>
              <Button>Juridisk</Button>
            </div>
            <Button>Logg ut</Button>

            <DrawerClose>
              <Button variant='outline'>Lukk</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
