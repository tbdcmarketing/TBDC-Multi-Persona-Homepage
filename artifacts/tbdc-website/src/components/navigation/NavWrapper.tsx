import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalNav from './GlobalNav';
import ContextualNav from './ContextualNav';
import MobileMenu from './MobileMenu';
import { PERSONA_ROUTES, CONTEXTUAL_NAV_CONFIG } from './navConfig';

export default function NavWrapper() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isPersonaPage = PERSONA_ROUTES.includes(pathname);
  const contextualConfig = CONTEXTUAL_NAV_CONFIG[pathname];

  return (
    <>
      <GlobalNav onMenuOpen={() => setMenuOpen(true)} />
      {isPersonaPage && contextualConfig && (
        <ContextualNav config={contextualConfig} configKey={pathname} />
      )}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
