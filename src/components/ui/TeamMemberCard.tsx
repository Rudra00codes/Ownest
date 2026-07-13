import Image from "next/image";
import { Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import type { TeamMember } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  const photoUrl = member.photo
    ? urlFor(member.photo).width(400).height(400).url()
    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80";

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border border-border card-hover opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Photo */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={photoUrl}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/80 via-transparent to-transparent" />

        {/* Social Links — revealed on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {member.social?.email && (
            <SocialLink
              href={`mailto:${member.social.email}`}
              icon={<Mail size={14} />}
              label="Email"
            />
          )}
          {member.social?.linkedin && (
            <SocialLink
              href={member.social.linkedin}
              icon={<Linkedin size={14} />}
              label="LinkedIn"
            />
          )}
          {member.social?.twitter && (
            <SocialLink
              href={member.social.twitter}
              icon={<Twitter size={14} />}
              label="Twitter"
            />
          )}
          {member.social?.facebook && (
            <SocialLink
              href={member.social.facebook}
              icon={<Facebook size={14} />}
              label="Facebook"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-playfair font-bold text-lg text-foreground mb-0.5">
          {member.name}
        </h3>
        <p className="text-royal-secondary text-sm font-medium mb-3">
          {member.position}
        </p>
        {member.bio && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-royal-secondary/90 hover:bg-royal-secondary text-royal-dark flex items-center justify-center transition-colors duration-200"
    >
      {icon}
    </a>
  );
}
