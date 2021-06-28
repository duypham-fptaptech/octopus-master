@extends('layout')
@section('calendar')
        <section role="main" class="content-body">
            <header class="page-header">
                <h2>Calendar</h2>

                <div class="right-wrapper pull-right">
                    <ol class="breadcrumbs">
                        <li>
                            <a href="index.html">
                                <i class="fa fa-home"></i>
                            </a>
                        </li>
                        <li><span>Pages</span></li>
                        <li><span>Calendar</span></li>
                    </ol>

                    <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fa fa-chevron-left"></i></a>
                </div>
            </header>

            <!-- start: page -->
            <section class="panel">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-9">
                            <div id="calendar"></div>
                        </div>
                        <div class="col-md-3">
                            <p class="h4 text-light">Draggable Events</p>

                            <hr />

                            <div id='external-events'>
                                <div class="external-event label label-default" data-event-class="fc-event-default">Default Event</div>
                                <div class="external-event label label-primary" data-event-class="fc-event-primary">Primary Event</div>
                                <div class="external-event label label-success" data-event-class="fc-event-success">Success Event</div>
                                <div class="external-event label label-warning" data-event-class="fc-event-warning">Warning Event</div>
                                <div class="external-event label label-info" data-event-class="fc-event-info">Info Event</div>
                                <div class="external-event label label-danger" data-event-class="fc-event-danger">Danger Event</div>
                                <div class="external-event label label-dark" data-event-class="fc-event-dark">Dark Event</div>

                                <hr />
                                <div>
                                    <div class="checkbox-custom checkbox-default ib">
                                        <input id="RemoveAfterDrop" type="checkbox"/>
                                        <label for="RemoveAfterDrop">remove after drop</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- end: page -->
        </section>

    <aside id="sidebar-right" class="sidebar-right">
        <div class="nano">
            <div class="nano-content">
                <a href="#" class="mobile-close visible-xs">
                    Collapse <i class="fa fa-chevron-right"></i>
                </a>

                <div class="sidebar-right-wrapper">

                    <div class="sidebar-widget widget-calendar">
                        <h6>Upcoming Tasks</h6>
                        <div data-plugin-datepicker data-plugin-skin="dark" ></div>

                        <ul>
                            <li>
                                <time datetime="2014-04-19T00:00+00:00">04/19/2014</time>
                                <span>Company Meeting</span>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-widget widget-friends">
                        <h6>Friends</h6>
                        <ul>
                            <li class="status-online">
                                <figure class="profile-picture">
                                    <img src="assets/images/!sample-user.jpg" alt="Joseph Doe" class="img-circle">
                                </figure>
                                <div class="profile-info">
                                    <span class="name">Joseph Doe Junior</span>
                                    <span class="title">Hey, how are you?</span>
                                </div>
                            </li>
                            <li class="status-online">
                                <figure class="profile-picture">
                                    <img src="assets/images/!sample-user.jpg" alt="Joseph Doe" class="img-circle">
                                </figure>
                                <div class="profile-info">
                                    <span class="name">Joseph Doe Junior</span>
                                    <span class="title">Hey, how are you?</span>
                                </div>
                            </li>
                            <li class="status-offline">
                                <figure class="profile-picture">
                                    <img src="assets/images/!sample-user.jpg" alt="Joseph Doe" class="img-circle">
                                </figure>
                                <div class="profile-info">
                                    <span class="name">Joseph Doe Junior</span>
                                    <span class="title">Hey, how are you?</span>
                                </div>
                            </li>
                            <li class="status-offline">
                                <figure class="profile-picture">
                                    <img src="assets/images/!sample-user.jpg" alt="Joseph Doe" class="img-circle">
                                </figure>
                                <div class="profile-info">
                                    <span class="name">Joseph Doe Junior</span>
                                    <span class="title">Hey, how are you?</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </aside>
@endsection
