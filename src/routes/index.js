import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'newpassword', element: <NewPassword /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <Dashboard /> },
        { path: 'settings', element: <Settings /> },
        { path: 'tickets', element: <TIcket /> },
        { path: 'tickets/new', element: <NewTicket /> },
        {
          path: 'ticket/view',
          children: [
            { path: ':id', element: <TicketDetails /> },
          ],
        },
        { path: 'security', element: <Security/> },
        { path: 'convert/airtime/manual', element: <AirtimeManual /> },
        { path: 'convert/airtime/manual/:id', element: <AirtimeManualPreview /> },
        { path: 'convert/airtime/automatic', element: <AirtimeAutomatic /> },
        { path: 'convert/airtime/automatic/:id', element: <AirtimeAutoPreview /> },
        { path: 'user/transfer', element: <Transfer /> },
        { path: 'kyc', element: <KYC /> },
        { path: 'bvn', element: <BVN /> },
        { path: 'deposit', element: <Deposit /> },
        { path: 'deposit/:id', element: <DepositPreview /> },
        { path: 'deposits', element: <Deposits /> },
        { path: 'ecard', element: <Ecard /> },
        { path: 'other/transfer', element: <Payout /> },
        { path: 'bank/transfer', element: <Bank /> },
        { path: 'savings', element: <Savings /> },
        { path: 'airtime', element: <Airtime /> },
        { path: 'internet', element: <Internet /> },
        { path: 'cabletv', element: <CableTV /> },
        { path: 'electricity', element: <Electricity /> },
        { path: 'electricity/token/:id', element: <Token /> },
        { path: 'waec', element: <Waec /> },
        { path: 'referral', element: <Referral /> },
        { path: 'requestfund', element: <RequestFund /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

         

      

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));

// DASHBOARD
const Dashboard = Loadable(lazy(() => import('../pages/user/Dashboard')));
const Settings = Loadable(lazy(() => import('../pages/user/Settings')));
const TIcket = Loadable(lazy(() => import('../pages/user/Tickets')));
const NewTicket = Loadable(lazy(() => import('../pages/user/ticket/TicketNew')));
const TicketDetails = Loadable(lazy(() => import('../pages/user/ticket/TicketDetails')));
const Security = Loadable(lazy(() => import('../pages/user/Security')));
const Transfer = Loadable(lazy(() => import('../pages/user/Transfer')));
const KYC = Loadable(lazy(() => import('../pages/user/KYC')));
const BVN = Loadable(lazy(() => import('../pages/user/BVN')));
const Deposit = Loadable(lazy(() => import('../pages/user/Deposit')));
const DepositPreview = Loadable(lazy(() => import('../pages/user/finance/DepositPreview')));
const Deposits = Loadable(lazy(() => import('../pages/user/DepositLog')));
const Ecard = Loadable(lazy(() => import('../pages/user/Ecard')));
const Payout = Loadable(lazy(() => import('../pages/user/Payout')));
const Bank = Loadable(lazy(() => import('../pages/user/Bank')));
const Savings = Loadable(lazy(() => import('../pages/user/Savings')));
const Airtime = Loadable(lazy(() => import('../pages/user/Airtime')));
const Internet = Loadable(lazy(() => import('../pages/user/Internet')));
const CableTV = Loadable(lazy(() => import('../pages/user/Cabletv')));
const Electricity = Loadable(lazy(() => import('../pages/user/Electricity')));
const Token = Loadable(lazy(() => import('../pages/user/bills/Token')));
const Referral = Loadable(lazy(() => import('../pages/user/Referral')));
const RequestFund = Loadable(lazy(() => import('../pages/user/RequestFund')));
const Waec = Loadable(lazy(() => import('../pages/user/Waec')));
const AirtimeAutomatic = Loadable(lazy(() => import('../pages/user/Airtime-Auto')));
const AirtimeManual = Loadable(lazy(() => import('../pages/user/Airtime-Manual')));
const AirtimeManualPreview = Loadable(lazy(() => import('../pages/user/conversion/ManualPreview')));
const AirtimeAutoPreview = Loadable(lazy(() => import('../pages/user/conversion/AutoPreview')));

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
