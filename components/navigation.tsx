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
import JsBarcode from 'jsbarcode';

export default function Navigation() {
  const supabase = createClient();
  const [barcode, setBarcode] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await supabase.auth.getUser();
  //     if (data) {
  //       setBarcode(data.user.id ?? '');
  //     } else if (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (barcode) {
  //     JsBarcode('#barcode', barcode, {
  //       displayValue: false,
  //       width: 0.5,
  //       height: 25,
  //       format: 'CODE128',
  //     });
  //     console.log(barcode);
  //   }
  // }, [barcode]);

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
              <svg id='barcode'></svg>
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
