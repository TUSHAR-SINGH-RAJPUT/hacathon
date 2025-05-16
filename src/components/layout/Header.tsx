// Update the profile menu items in Header.tsx to include the language option
{/* Add this item in the DropdownMenuContent component, before the logout option */}
<DropdownMenuItem asChild>
  <Link href="/profile/language" className="flex items-center gap-2 w-full">
    <Languages size={16}/> Language Settings
  </Link>
</DropdownMenuItem>