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

export default function Navigation() {
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
