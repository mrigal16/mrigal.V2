import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import img from "@/components/imgs/mrigal.png";
import Image from "next/image";
const Legal = () => {
  return (
    <section className="m-4">
      <header className="border-b border-gray-200 mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src={img} alt="My logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <nav>
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
              >
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <Link href="/sign-up">Inscription</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <h1 className="text-xl font-bold">
        Conditions Générales d'Utilisation (CGU) – DIGITSERVZ
      </h1>
      <h3 className="text-lg font-semibold">1. Introduction</h3>
      <p className="hyphens-auto text-wrap p-1">
        Sarl DigitservZ met à disposition des e-consommateurs, partenaires et
        utilisateurs un site web permettant d'accéder à des informations sur ses
        produits et services actuels ou à venir. L'accès et l'utilisation de ces
        services sont soumis aux présentes Conditions Générales d'Utilisation
        (CGU). Ces CGU définissent vos droits et obligations et doivent être
        lues et acceptées avant toute utilisation des services. L'acceptation
        des CGU constitue un engagement envers Sarl DigitservZ. Elles sont
        accessibles à tout moment et peuvent être modifiées par Sarl DigitservZ,
        l'utilisateur en étant informé en cas de mise à jour.
      </p>
      <h3 className="text-lg font-semibold">1.2 Définitions</h3>
      <p className="hyphens-auto text-wrap p-1">
        « Application/Applications » désigne les applications M’rigal Web et
        M’rigal mobile développées par la société Sarl DigitservZ disponibles
        sur le web Via le lien https://mrigal.vercel.app/ , « Conditions »
        désigne les présentes conditions générales d’utilisation; «
        Client/E-consommateur » désigne toute personne physique ou morale
        souhaitant bénéficier des services (ci-après : les « Clients ») ou un
        intervenant dans le cadre de circuit de distribution de biens et de
        services via des plateformes numériques conformément à l’article 10 de
        la loi de finance de 2019; « Contenu de l’Utilisateur » désigne les
        contenus et informations textuels, audio et/ou visuels, communiqués lors
        de votre inscription, y compris les commentaires et les retours
        d’information relatifs aux Services ou aux Services de Tiers, ainsi que
        les contenus et informations communiqués lors de demandes d’assistance
        et à l’occasion de la participation à des jeux-concours et à des
        opérations promotionnelles; « Frais Additionnels » désigne les frais
        exigibles, le cas échéant, en complément des tarifs applicables aux
        Services en cas notamment de non-respect de vos obligations à l’égard
        des intervenants auprès de la plateforme, tels que décrites dans les
        présentes. Les frais Additionnels sont ajoutés aux tarifs applicables,
        le cas échéant; « Services » désigne les services disponibles sur les
        applications et/ou site web M’rigal; « Site Web » désigné une Interface
        dynamique disponible sur l’adresse https://mrigal.vercel.app/; « Tarifs
        » désigne les prix applicables aux Services qui vous seront expressément
        communiqués via l’Application et/ou Site Internet au moment de la
        validation de l’inscription ; «E-paiement ou Moyen de paiement
        électronique » désigne tout instrument de paiement, autorisé
        conformément à la législation en vigueur, permettant à son titulaire
        d’effectuer des paiements de proximité ou à distance à travers un
        système électronique.
      </p>
      <h3 className="text-lg font-semibold">
        2. Inscription et Création de Compte{" "}
      </h3>
      <h3 className="text-lg font-medium">2.1 Processus d’inscription :</h3>
      <p className="hyphens-auto text-wrap p-1">
        Pour utiliser les services proposés, vous devez : Fournir des
        informations exactes, complètes et à jour lors de l’inscription. Créer
        un compte unique associé à votre identité.
      </p>
      <h3 className="text-lg font-medium">
        2.2 Obligations de l’utilisateur :
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Garder vos identifiants de connexion confidentiels Informer
        immédiatement l’administrateur en cas d’utilisation non autorisée de
        votre compte.
      </p>
      <h3 className="text-lg font-medium">2.3 Compte client :</h3>{" "}
      <p className="hyphens-auto text-wrap p-1">
        Les données personnelles collectées lors de l’inscription sont
        strictement nécessaires pour la création de votre compte et la
        fourniture des services associés.
      </p>
      <h3 className="text-lg font-semibold">
        3. Gestion des Données Personnelles{" "}
      </h3>
      <h3 className="text-lg font-medium">
        3.1 Collecte et finalités : Les informations collectées incluent [ex. :
        nom, prénom, email, numéro de téléphone], nécessaires pour :
      </h3>
      <p className="hyphens-auto text-wrap p-1 ">
        -Identifier les utilisateurs -Fournir des services personnalisés.
        -Communiquer des mises à jour importantes.
      </p>
      <h3 className="text-lg font-medium"> 3.2 Droits des utilisateurs :</h3>
      <p className="hyphens-auto text-wrap p-1">
        Conformément à la loi n° 18-07, vous avez le droit de : -Accéder à vos
        données personnelles. -Corriger ou mettre à jour vos informations.
        Demander la suppression de votre compte et de vos données (sauf
        obligations légales de conservation).
      </p>
      <h3 className="text-lg font-medium"> 3.3 Stockage des données :</h3>
      <p className="hyphens-auto text-wrap p-1">
        Vos données sont stockées sur des serveurs sécurisés situés en Algérie
        et non à l’étranger . La plateforme prend toutes les mesures nécessaires
        pour garantir leur protection.
      </p>
      <h3 className="text-lg font-semibold">
        4. Responsabilité de la Plateforme
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Nous nous engageons à respecter la confidentialité de vos données
        Cependant, nous déclinons toute responsabilité en cas d’accès non
        autorisé résultant d’un manquement de l’utilisateur à la sécurité de ses
        identifiants
      </p>
      <h3 className="text-lg font-semibold">5. Responsabilité Limitée</h3>
      <p className="hyphens-auto text-wrap p-1">
        La plateformen’est pas responsable des dommages indirects résultant de
        l’utilisation des applications (perte de données, interruption de
        service). La responsabilité de l’utilisateur est engagée en cas de
        non-respect des lois algériennes ou des conditions spécifiques d’une
        application
      </p>
      <h3 className="text-lg font-semibold">6. Accès aux services </h3>
      <p className="hyphens-auto text-wrap p-1">
        Nos services sont destinés aux bénéficiaires ayant la pleine capacité
        juridique conformément à la loi algérienne. L'acceptation des CGU engage
        l'utilisateur envers Sarl DigitservZ. L'accès aux services requiert une
        inscription sur notre plateforme ou application (M’rigal, Raîd-in). Les
        données personnelles des utilisateurs sont strictement confidentielles
        (voir article 3). L'utilisation des applications peut être gratuite ou
        payante selon la nature des services. La suspension ou la résiliation
        d'un compte peut être décidée en cas de cyberattaque, piratage,
        interruption des services, erreur technique ou infection par des virus.
      </p>
      <h3 className="text-lg font-semibold">
        7. Protection des données personnelles
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Conformément à la loi 18-07 du 10 juin 2018, toute personne utilisant
        nos services consent à la collecte, au traitement et au stockage de ses
        données personnelles par Sarl DigitservZ. Une Commission Nationale de
        Protection des Données Personnelles (CNDP) est en place pour garantir la
        sécurité des données, en accord avec l’article 46 de la Constitution de
        2020 qui protège la vie privée et l’honneur des citoyens.
      </p>
      <h3 className="text-lg font-semibold">
        8. Droits d’auteur et propriété intellectuelle
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Sarl DigitservZ est propriétaire de ses applications, logos, textes et
        éléments graphiques. L’ensemble du contenu de nos plateformes et
        applications est protégé par les lois algériennes sur la propriété
        intellectuelle, notamment : Ordonnance n°03-05 du 19 juillet 2003
        relative aux droits d’auteur et droits voisins, Ordonnance n°07-03 du
        1er mars 2007, Loi n°20-05 du 3 juin 2020 relative à la lutte contre la
        contrefaçon, Loi n°09-04 du 5 août 2009 sur la prévention et la
        répression des infractions liées aux technologies de l’information.
        Toute reproduction, diffusion ou utilisation sans autorisation est
        sanctionnée par la loi.
      </p>
      <h3 className="text-lg font-semibold">
        {" "}
        9. Responsabilités de Sarl DigitservZ{" "}
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        L’utilisation des données de connexion et toute information partagée sur
        notre plateforme ou application sont soumises à notre politique de
        confidentialité, en conformité avec la législation algérienne.
      </p>
      <h3 className="text-lg font-semibold">
        10. Droits des e-consommateurs L’e-consommateur dispose des droits
        suivants :
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Droit d’accès à ses données personnelles, Droit de rectification en cas
        d'erreur ou d'inexactitude, Droit de suppression de ses données sur
        demande.
      </p>
      <h3 className="text-lg font-semibold">
        11. Obligations des e-consommateurs Pour utiliser nos services
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        l’e-consommateur doit créer un compte avec des informations exactes
        (nom, prénom, numéro de téléphone, etc.). Il est seul responsable de
        l'exactitude de ses données et de l'utilisation qu'il fait de
        l'application.
      </p>
      <h3 className="text-lg font-semibold"> 12. Mise à jour des CGU</h3>
      <p className="hyphens-auto text-wrap p-1">
        DIGITSERVZ se réserve le droit de modifier les CGU à tout moment. Les
        utilisateurs seront informés des mises à jour, et les dates des
        révisions seront mentionnées sur notre plateforme.
      </p>
      <h3 className="text-lg font-semibold"> 13. révision des prix </h3>
      <p className="hyphens-auto text-wrap p-1">
        Le prix du Service peut faire l’objet d’une révision par la société à
        tout moment, et à sa libre discrétion. Le prix du Service peut faire
        l’objet d’une révision par Sarl DigitservZ à tout moment et à sa libre
        discrétion. Sans avoir à informer le E-consommateur et/ou le notifier de
        ces modifications. Si le E-consommateur n’accepte pas les nouveaux prix,
        il doit mettre fin à son utilisation du Service selon les modalités
        prévues à l’article 11 des présentes conditions générales. À défaut, il
        sera réputé avoir accepté les nouveaux tarifs.
      </p>
      <h3 className="text-lg font-semibold">14. Durée des Services</h3>
      <p className="hyphens-auto text-wrap p-1">
        désinscription Les Services sont souscrits pour une durée indéterminée.
        Le E-consommateur peut se désinscrire du Service à tout moment, en
        désinstallant son application.
      </p>
      <h3 className="text-lg font-semibold">
        15. Litiges et juridiction compétente
      </h3>
      <p className="hyphens-auto text-wrap p-1">
        Les présentes CGU sont régies par la législation algérienne, notamment :
        Loi n°18-07 du 10 juin 2018 sur la protection des données personnelles,
        Loi n°09-04 du 5 août 2009 sur la prévention des infractions
        informatiques, Loi n°18-05 de mai 2018 relative au commerce
        électronique, Loi n°04-08 du 4 août 2004 sur la lutte contre la
        criminalité informatique, Loi n°05-04 du 5 mai 2005 sur la
        cybercriminalité, Loi n°05-05 du 1er avril 2020 régulant les plateformes
        numériques. Les CGU sont régies par la législation algérienne. En cas de
        litige, seuls les tribunaux algériens sont compétents.
      </p>
    </section>
  );
};

export default Legal;
