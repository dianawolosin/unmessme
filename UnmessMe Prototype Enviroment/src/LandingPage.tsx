import { useRef } from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FeatureCard,
  TerminalReceipt,
  Tag,
  Button,
  AppShell,
  Footer,
  tokens,
} from '@unmessme/design-system';

// Font families come from the system, never hardcoded here.
const serif = tokens.typography.primitive.fontFamily.serif;
const mono = tokens.typography.primitive.fontFamily.mono;
import {
  AutoAwesome,
  Psychology,
  VerifiedUser,
  Bolt,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from '@mui/icons-material';

interface LandingPageProps {
  onGetStarted: () => void;
}

/** Nav that sits in the AppShell header. */
function Nav({ onGetStarted }: { onGetStarted: () => void }) {
  const links = ['How it works', 'Pricing', 'About', 'Log in'];
  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {links.map((link) => (
          <Typography
            key={link}
            component="a"
            href="#"
            sx={{
              fontFamily: mono,
              fontSize: tokens.typography.primitive.fontSize.sm,
              fontWeight: Number(tokens.typography.primitive.fontWeight.medium),
              letterSpacing: '0.02em',
              color: tokens.color.semantic.text.secondary,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              '&:hover': { color: tokens.color.semantic.text.primary },
            }}
          >
            {link}
          </Typography>
        ))}
      </Stack>
      <Button variant="secondary" size="sm" onClick={onGetStarted}>
        Get started
      </Button>
    </Stack>
  );
}

/** The "Wall of Worry" tape tags: a centered row of tacks. */
function WorryScatter() {
  const worries: Array<{ label: string; color: 'urgent' | 'analysis' | 'brand'; rotate: number }> = [
    { label: 'existential dread', color: 'brand', rotate: -3 },
    { label: 'unpaid bills', color: 'urgent', rotate: 2 },
    { label: 'avoidance', color: 'analysis', rotate: -1.5 },
    { label: 'career panic', color: 'brand', rotate: 3 },
    { label: '30-year-old crisis', color: 'urgent', rotate: -2.5 },
    { label: 'sleep debt', color: 'analysis', rotate: -2 },
    { label: 'deadlines', color: 'brand', rotate: 1.5 },
  ];
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', maxWidth: 1080, mx: 'auto' }}>
      {worries.map((w) => (
        <Tag
          key={w.label}
          label={w.label}
          color={w.color}
          variant="solid"
          size="md"
          tape
          sx={{ transform: `rotate(${w.rotate}deg)` }}
        />
      ))}
    </Box>
  );
}

/**
 * LandingPage: the public face of UnmessMe.
 *
 * The "correct" reference screen for the Section 0 drift exercise. Every pixel
 * here is built on-system, with full context.
 */
export function LandingPage({ onGetStarted }: LandingPageProps) {
  // Scroll-linked parallax for the hero peek: as the hero scrolls away, the
  // image drifts up and fades, letting the lit fog behind it read through.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 0.55]);

  return (
    <AppShell headerActions={<Nav onGetStarted={onGetStarted} />}>
      {/* HERO */}
      <Box ref={heroRef} sx={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        {/* Lit fog behind the hero (seafoam + iris glow) */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: '-20% -10%',
            zIndex: 0,
            pointerEvents: 'none',
            background: `
              radial-gradient(45% 45% at 22% 28%, ${alpha(tokens.color.semantic.action.primary, 0.16)}, transparent 70%),
              radial-gradient(45% 45% at 82% 42%, ${alpha(tokens.color.semantic.status.analysis, 0.16)}, transparent 70%),
              radial-gradient(40% 40% at 60% 85%, ${alpha(tokens.color.semantic.status.urgent, 0.08)}, transparent 70%)
            `,
            filter: 'blur(48px)',
          }}
        />

        <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Left: pitch */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontStyle: 'italic',
                color: tokens.color.semantic.text.primary,
                mb: 4,
              }}
            >
              Your life. But organized. Finally.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: tokens.color.semantic.text.secondary,
                borderLeft: `${tokens.border.width.thick} solid ${tokens.color.semantic.action.primary}`,
                pl: 2.5,
                maxWidth: 460,
                mb: 5,
              }}
            >
              Tell us the mess. We hand it back as small, doable steps.
            </Typography>
            <Button variant="primary" size="lg" onClick={onGetStarted}>
              Unmess Me
            </Button>
          </Grid>

          {/* Right: the product, shown as a simplified, slightly angled
              product screenshot (stronger glass, no wrapping text). */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                style={{
                  y: heroImageY,
                  opacity: heroImageOpacity,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src="/hero-peek.png"
                  alt="A glimpse of the UnmessMe dashboard: one worry, sorted into a short, doable plan."
                  sx={{
                    width: '100%',
                    maxWidth: 620,
                    height: 'auto',
                    borderRadius: tokens.radius.semantic.xl,
                    transform: 'rotate(2deg)',
                    boxShadow: tokens.elevation.semantic.modal,
                  }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Stack spacing={16} sx={{ pb: 0, pt: 8 }}>
        {/* Problem agitation */}
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: serif,
                color: tokens.color.semantic.text.primary,
                mb: 2,
              }}
            >
              Turn your problems into opportunities with UnmessMe
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: mono,
                fontWeight: Number(tokens.typography.primitive.fontWeight.medium),
                color: tokens.color.semantic.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Stop spiraling. Start sorting.
            </Typography>
            <Box sx={{ mt: 5 }}>
              <WorryScatter />
            </Box>
          </Box>
        </Container>

        {/* Solution (Bento grid) */}
        <Container maxWidth="lg" disableGutters sx={{ position: 'relative' }}>
          {/* Subtle fog so the glass cards have something to refract */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: '-10% -5%',
              zIndex: 0,
              pointerEvents: 'none',
              background: `
                radial-gradient(40% 40% at 25% 30%, ${alpha(tokens.color.semantic.action.primary, 0.1)}, transparent 70%),
                radial-gradient(40% 40% at 78% 70%, ${alpha(tokens.color.semantic.status.analysis, 0.1)}, transparent 70%)
              `,
              filter: 'blur(60px)',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: serif,
              color: tokens.color.semantic.text.primary,
              mb: 6,
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Where your problems become plans
          </Typography>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={8}>
              <FeatureCard
                title="Tag-Based Trauma Sorting"
                description="We don't do rigid categories. Tag your mess with whatever feels real: 'money', 'guilt', 'spicy sadness'. We organize it all."
                icon={<AutoAwesome />}
                accent="seafoam"
                delay={0.1}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Zero Judgment"
                description="Our AI has seen worse. It's not here to judge your 3 AM panic; it's here to make a list."
                icon={<VerifiedUser />}
                accent="iris"
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Panic to Plan"
                description="Turn 'AHHHHHH' into 3 actionable steps. Instant clarity, zero fluff."
                icon={<Bolt />}
                accent="terracotta"
                delay={0.3}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <FeatureCard
                title="The Midnight Terminal"
                description="A visual environment designed for the modern anxious brain. Dark mode first, high contrast, and deeply calming."
                icon={<Psychology />}
                accent="seafoam"
                delay={0.4}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Social proof */}
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                fontFamily: mono,
                color: tokens.color.semantic.status.analysis,
                mb: 4,
                letterSpacing: '0.2em',
              }}
            >
              TESTIMONIAL_LOGS
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{ width: '100%', justifyContent: 'center' }}
            >
              <TerminalReceipt
                text="I felt like my brain was on fire. UnmessMe turned the fire into a very nice spreadsheet."
                author="Sarah J."
                role="Creative Director"
                timestamp="10:42 PM"
              />
              <TerminalReceipt
                text="Finally, an app that doesn't tell me to 'breathe' but tells me exactly which email to send first."
                author="Marcus T."
                role="Founder"
                timestamp="02:15 AM"
              />
            </Stack>
          </Box>
        </Container>

        {/* Footer CTA */}
        <Box sx={{ textAlign: 'center', py: 8, borderTop: `${tokens.border.width.base} solid ${tokens.color.semantic.border.subtle}` }}>
          <Typography variant="h3" sx={{ fontFamily: serif, mb: 4 }}>
            Ready to unmess yourself?
          </Typography>
          <Button onClick={onGetStarted} variant="primary" size="lg">
            Unmess Me
          </Button>
        </Box>
      </Stack>

      {/* Site footer: structural component from the design system, UnmessMe content supplied here */}
      <Footer
        brand="UnmessMe"
        tagline="therapy-parody for your hot mess"
        columns={[
          { title: 'Product', links: ['Features', 'Pricing', 'Dashboard', 'Changelog'] },
          { title: 'Company', links: ['About', 'Manifesto', 'Careers', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Definitely not therapy'] },
        ]}
        socials={[
          { label: 'Twitter', icon: <Twitter fontSize="small" /> },
          { label: 'Instagram', icon: <Instagram fontSize="small" /> },
          { label: 'LinkedIn', icon: <LinkedIn fontSize="small" /> },
          { label: 'GitHub', icon: <GitHub fontSize="small" /> },
        ]}
        address="HQ: 1 Spiral Street, Never-a-Mess Land 00000"
        copyright="© 2025 UnmessMe Inc."
        note="Not a licensed therapist. Just a really good dashboard."
      />
    </AppShell>
  );
}
