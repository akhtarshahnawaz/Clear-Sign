'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from './connect-button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Submit', href: '/' },
  { name: 'My Submissions', href: '/my-submissions' },
  { name: 'Review Community', href: '/review-community' },
  { name: 'Search', href: '/search' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            
<Link href="/" className="flex items-center space-x-3">
  <span className="text-4xl">🔍</span>
  <div className="flex flex-col items-start">
    <span className="font-bold text-2xl text-red-500 tracking-wider">MetaProof</span>
    <span className="text-xs text-gray-500">ERC7730 Community Review</span>
  </div>
</Link>


            
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
