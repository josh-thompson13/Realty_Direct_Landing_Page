import { component$, useStore } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

import Logo from "~/components/common/Logo";
import ToggleTheme from "~/components/common/ToggleTheme";
import ToggleMenu from "~/components/common/ToggleMenu";
import IconChevronDown from "../icons/IconChevronDown";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
  });

  const { menu } = useContent();

  return (
    <header
      id="header"
      class={`sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-50/0 transition-[opacity] ease-in-out ${
        store.isScrolling
          ? " bg-white dark:bg-slate-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90"
          : ""
      }`}
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >
      <div class="absolute inset-0"></div>
      <div class="text-default relative mx-auto w-full max-w-7xl px-3 py-3 md:flex md:justify-between md:px-6">
        <div class="mr-auto flex justify-between rtl:ml-auto rtl:mr-0">
          <a class="flex items-center" href={"/"}>
            <Logo />
          </a>
        </div>
        <nav
          class="text-default hidden w-full items-center overflow-y-auto overflow-x-hidden md:mx-5 md:flex md:w-auto md:overflow-x-auto md:overflow-y-visible"
          aria-label="Main navigation"
        >
          {menu && menu.items ? (
            <ul class="flex w-full flex-col text-xl font-medium tracking-[0.01rem] md:w-auto md:flex-row md:self-center md:text-[0.9375rem]">
              {menu.items.map(({ text, href, items }, key) => (
                <li key={key} class={items?.length ? "dropdown" : ""}>
                  {items?.length ? (
                    <>
                      <button class="hover:text-link flex items-center px-4 py-3 dark:hover:text-white">
                        {text}{" "}
                        <IconChevronDown class="ml-0.5 hidden h-3.5 w-3.5 rtl:ml-0 rtl:mr-0.5 md:inline" />
                      </button>
                      <ul class="dropdown-menu rounded pl-4 font-medium drop-shadow-xl md:absolute md:hidden md:min-w-[200px] md:bg-white/90 md:pl-0 md:backdrop-blur-md dark:md:bg-slate-800">
                        {items.map(({ text: text2, href: href2 }, key2) => (
                          <li key={key2}>
                            <a
                              class="hover:text-link whitespace-no-wrap block px-5 py-2 first:rounded-t last:rounded-b dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-gray-100"
                              href={href2}
                            >
                              {text2}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      class="hover:text-link items-centers flex px-4 py-3 dark:hover:text-white"
                      href={href}
                    >
                      {text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
        <div class="fixed bottom-0 left-0 hidden w-full items-center justify-end p-3 rtl:left-auto rtl:right-0 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0">
          <div class="flex w-full items-center justify-between md:w-auto">
            <span class="ml-4 rtl:ml-0 rtl:mr-4">
              <a
                href="https://github.com/onwidget/qwind"
                class="btn btn-primary px-5.5 ml-2 w-auto py-2.5 text-sm font-semibold shadow-none md:px-6"
              >
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});
